import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {messageJS} from "../js";
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux"; 
import {socketJS} from '../js';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

function LoadChat({ chatId, query = "" }) {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        async function fetchMessages() {
            if (!chatId) return;
            setLoading(true);
            const res = await messageJS.getMessages(chatId);
            if (res.status) {
                setMessages(res.messages);
            }
            setLoading(false);
        }

        fetchMessages();

        const handleNewMessage = (newMessage) => {
            if (newMessage.roomId === chatId) {
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        socketJS.on("receive_message", handleNewMessage);

        return () => {
            socketJS.off("receive_message", handleNewMessage);
        };
    }, [chatId, user.token]);
 
    useLayoutEffect(() => {
        if (messagesEndRef.current) { 
            messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        } 
    }, [messages]);
   

    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
 
    let previousDate = null;
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {messages.length === 0 && (
                    <div className='first-message-prompt'><span className="first-message-mark">+</span><strong>This is the beginning</strong><span>Say hello to your friend and get the conversation going.</span></div>
                )}

                {messages.length > 0 && <div className="chat-start-note"><span /> Conversation history <span /></div>}

                {messages.filter((msg) => msg.content.toLowerCase().includes(query.trim().toLowerCase())).map((msg, index, visibleMessages) => {
                    const isSender = msg.sender._id.toString() === user._id.toString();
                    const formattedDate = messageJS.getMessageDate(msg.createdAt);
                    const previousDate = index > 0 ? messageJS.getMessageDate(visibleMessages[index - 1].createdAt) : null;
                    const sameAuthor = index > 0 && visibleMessages[index - 1].sender._id.toString() === msg.sender._id.toString() && previousDate === formattedDate;
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
                                {!isSender && !sameAuthor ? <div className="message-avatar">{msg.sender.username[0]}</div> : !isSender ? <div className="message-avatar-spacer" /> : null}
                                <div className={`message-bubble py-1 px-2 rounded-xl max-w-[90%] ${isSender ? 'bg-gray-800 border border-gray-700' : 'glass-bg'} text-white self-start`}>
                                    {!sameAuthor && <div className="message-author">{isSender ? 'You' : msg.sender.username}</div>}
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
                {query.trim() && !messages.some((msg) => msg.content.toLowerCase().includes(query.trim().toLowerCase())) && <div className="message-search-empty">No matching messages found.</div>}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default LoadChat;
