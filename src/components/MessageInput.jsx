import { IoSend } from "react-icons/io5";
import IconButton from "./IconButton";
import { useRef, useState } from "react";
import { updateRefreshChatlist } from "../redux/chatSlice";
import { useDispatch } from "react-redux";
import { socketJS } from "../js";

function MessageInput({ chatId }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const pending = useRef(null);
  const sending = useRef(false);
  const dispatch = useDispatch();

  const handleSend = () => {
    const content = message.trim();
    if (!content || sending.current) return;
    if (!socketJS.connected) {
      setSendError("Waiting for a connection. Your message is still here.");
      return;
    }

    if (pending.current?.content !== content) {
      pending.current = { content, clientId: crypto.randomUUID() };
    }

    sending.current = true;
    setIsSending(true);
    setSendError("");
    socketJS.timeout(10000).emit("send_message", { roomId: chatId, ...pending.current }, (timeoutError, result) => {
      sending.current = false;
      setIsSending(false);
      if (timeoutError || !result?.ok) {
        setSendError(result?.msg || "Delivery could not be confirmed. Retry to check.");
        return;
      }

      pending.current = null;
      setMessage("");
      dispatch(updateRefreshChatlist(true));
    });
  };

  return (
    <div className="composer-state">
      {sendError && <div className="history-status" role="status">{sendError} <button type="button" onClick={handleSend}>Retry</button></div>}
      <div className="message-composer flex w-full items-center justify-between">
        <textarea
          value={message}
          rows="1"
          disabled={isSending}
          maxLength={4000}
          aria-label="Write a message"
          onChange={(e) => { setMessage(e.target.value); setSendError(""); }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="message-field w-full h-full bg-slate-800 px-4 py-2 text-white font-medium border border-slate-800 rounded-lg focus-visible:outline-none resize-none custom-scrollbar"
          placeholder="Write a message…"
        />
        <div className="composer-tools"><span className="composer-shortcut">Enter to send. Shift+Enter for a new line.</span><span className="composer-count">{message.length}/4000</span><span className="composer-divider" /><IconButton icon={<IoSend />} tooltip={"Send message"} position="top" active={false} onClick={handleSend} /></div>
      </div>
    </div>
  );
}

export default MessageInput;
