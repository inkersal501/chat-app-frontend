import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {messageJS} from "../js";
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux"; 
import {socketJS} from '../js';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

function mergeMessages(previous, incoming) {
    const byId = new Map([...previous, ...incoming].map((message) => [message._id, message]));
    return [...byId.values()].sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt) || a._id.localeCompare(b._id));
}

function LoadChat({ chatId, query = "" }) {
    const [messages, setMessages] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [status, setStatus] = useState("loading");
    const [older, setOlder] = useState("idle");
    const [showJump, setShowJump] = useState(false);
    const [connection, setConnection] = useState("Connecting…");
    const retryRef = useRef(null);
    const requestRef = useRef(null);
    const scrollRef = useRef(null);
    const scrollAnchor = useRef(null);
    const followLatest = useRef(true);
    const historyWatermark = useRef(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        const lifetime = new AbortController();
        requestRef.current = lifetime;
        let attempt = 0;

        async function refreshHistory() {
            const current = ++attempt;
            const newestKnown = historyWatermark.current;
            let newestFetched;
            let before;
            let result;
            do {
                result = await messageJS.getMessages(chatId, { before, signal: lifetime.signal });
                if (lifetime.signal.aborted || current !== attempt) return;
                if (!result?.status) {
                    setStatus("error");
                    return;
                }

                if (!before) {
                    newestFetched = result.messages.at(-1);
                    if (!newestKnown) setNextCursor(result.nextCursor);
                }
                setMessages((previous) => mergeMessages(previous, result.messages));
                before = result.nextCursor;
            } while (newestKnown && before &&
                (result.messages[0].createdAt > newestKnown.createdAt ||
                    (result.messages[0].createdAt === newestKnown.createdAt && before > newestKnown._id)));
            if (newestFetched) historyWatermark.current = newestFetched;
            setStatus("ready");
        }

        function joinAndRefresh() {
            const current = ++attempt;
            setConnection("Connecting…");
            socketJS.timeout(8000).emit("join_room", chatId, (error, result) => {
                if (lifetime.signal.aborted || current !== attempt) return;
                setConnection(error || !result?.ok ? "Live updates unavailable" : "");
                void refreshHistory();
            });
        }

        function handleDisconnect() {
            setConnection("Reconnecting…");
        }

        function handleNewMessage(message) {
            if (message.roomId === chatId) {
                setMessages((previous) => mergeMessages(previous, [message]));
            }
        }

        retryRef.current = () => {
            if (socketJS.connected) joinAndRefresh();
            else void refreshHistory();
        };
        socketJS.on("receive_message", handleNewMessage);
        socketJS.on("connect", joinAndRefresh);
        socketJS.on("disconnect", handleDisconnect);
        socketJS.on("connect_error", handleDisconnect);
        if (socketJS.connected) joinAndRefresh();
        else void refreshHistory();

        return () => {
            lifetime.abort();
            socketJS.off("receive_message", handleNewMessage);
            socketJS.off("connect", joinAndRefresh);
            socketJS.off("disconnect", handleDisconnect);
            socketJS.off("connect_error", handleDisconnect);
            if (socketJS.connected) socketJS.emit("leave_room", chatId);
        };
    }, [chatId]);

    useLayoutEffect(() => {
        const viewport = scrollRef.current;
        if (!viewport) return;
        if (scrollAnchor.current) {
            const { height, top } = scrollAnchor.current;
            viewport.scrollTop = top + viewport.scrollHeight - height;
            scrollAnchor.current = null;
        } else if (followLatest.current && !query.trim()) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages, query]);

    async function loadOlder() {
        const signal = requestRef.current.signal;
        setOlder("loading");
        const result = await messageJS.getMessages(chatId, { before: nextCursor, signal });
        if (signal.aborted) return;
        if (!result?.status) {
            setOlder("error");
            return;
        }
        const viewport = scrollRef.current;
        scrollAnchor.current = { height: viewport.scrollHeight, top: viewport.scrollTop };
        setNextCursor(result.nextCursor);
        setMessages((previous) => mergeMessages(previous, result.messages));
        setOlder("idle");
    }

    const visibleMessages = messages.filter((message) =>
        message.content.toLowerCase().includes(query.trim().toLowerCase()));

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {connection && <div className="history-status" role="status">{connection} <button type="button" onClick={() => retryRef.current?.()}>Retry</button></div>}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar" ref={scrollRef}
                onScroll={({ currentTarget }) => {
                    if (query.trim()) return;
                    followLatest.current = currentTarget.scrollHeight - currentTarget.scrollTop - currentTarget.clientHeight < 100;
                    setShowJump(!followLatest.current);
                }}>
                {status === "loading" && <p className="history-status" role="status">Loading messages…</p>}
                {status === "error" && <div className="history-status" role="status">Could not load messages. <button type="button" onClick={() => retryRef.current?.()}>Retry</button></div>}
                {nextCursor && <div className="history-status"><button type="button" disabled={older === "loading"} onClick={loadOlder}>{older === "loading" ? "Loading older messages…" : older === "error" ? "Retry loading older messages" : "Load older messages"}</button></div>}
                {status === "ready" && messages.length === 0 && (
                    <div className="first-message-prompt"><strong>This is the beginning</strong><span>Send your first message to start the conversation.</span></div>
                )}
                {visibleMessages.map((msg, index) => {
                    const isSender = msg.sender?._id === user?._id;
                    const formattedDate = messageJS.getMessageDate(msg.createdAt);
                    const previousDate = index > 0 ? messageJS.getMessageDate(visibleMessages[index - 1].createdAt) : null;
                    const sameAuthor = index > 0 && visibleMessages[index - 1].sender?._id === msg.sender?._id && previousDate === formattedDate;
                    const showDateSeparator = formattedDate !== previousDate;
                    const copyMessage = async () => {
                        try {
                            await navigator.clipboard.writeText(msg.content);
                            toast.success("Message copied");
                        } catch {
                            toast.error("Could not copy this message");
                        }
                    };
                    return (
                        <div key={msg._id || `${msg.createdAt}-${index}`} className={`message-row ${isSender ? 'is-mine' : ''} ${sameAuthor ? 'is-grouped' : ''}`}>
                            {showDateSeparator && (
                                <div className="text-center my-2">
                                    <span className="px-2 py-1 bg-slate-900 text-gray-400 text-xs rounded-md cursor-default">
                                        {formattedDate}
                                    </span>
                                </div>
                            )}

                            <div className={`flex items-end gap-3 ${isSender ? 'flex-row-reverse' : ''}`}>
                                {!isSender && !sameAuthor ? <div className="message-avatar">{msg.sender?.username?.[0] || "?"}</div> : !isSender ? <div className="message-avatar-spacer" /> : null}
                                <div className={`message-bubble py-1 px-2 rounded-xl max-w-[90%] ${isSender ? 'bg-gray-800 border border-gray-700' : 'glass-bg'} text-white self-start`}>
                                    {!sameAuthor && <div className="message-author">{isSender ? 'You' : (msg.sender?.username || "Unknown user")}</div>}
                                    <div className='message-content-line'>
                                        <span className='whitespace-pre'>{msg.content}</span>
                                        <span className='message-time'>{messageJS.convertDatetoTime(msg.createdAt)}</span>
                                    </div>
                                    <button type="button" className="message-copy" onClick={copyMessage} aria-label="Copy message" title="Copy message"><FaRegCopy /></button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {query.trim() && visibleMessages.length === 0 && status === "ready" && <div className="message-search-empty">No matches in loaded messages.</div>}
            </div>
            {showJump && !query.trim() && <div className="history-status"><button type="button" onClick={() => {
                followLatest.current = true;
                setShowJump(false);
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }}>Jump to latest</button></div>}
        </div>
    );
}

export default LoadChat;
