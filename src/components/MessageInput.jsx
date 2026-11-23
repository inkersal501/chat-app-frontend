import { IoSend } from "react-icons/io5";
import IconButton from "./IconButton";
import { useState, useEffect } from "react";
import { selectUser } from "../redux/authSlice";
import { activeChat, updateRefreshChatlist } from '../redux/chatSlice';
import { useDispatch, useSelector } from "react-redux";
import {socketJS} from "../js";
import { toast } from "react-toastify";

function MessageInput() {

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const user = useSelector(selectUser);
  const { id } = useSelector(activeChat); 
  const dispatch = useDispatch();
  
  const handleSend = () => {
    const content = message.trim();
    if (!content || !id || isSending) return;
    if (!socketJS.connected) {
      toast.error("Reconnecting to Convo. Try again in a moment.");
      return;
    }

    setIsSending(true);
    socketJS.timeout(10000).emit("send_message", { roomId: id, content }, (timeoutError, result) => {
      setIsSending(false);
      if (timeoutError || !result?.ok) {
        toast.error(result?.msg || "Your message could not be sent. Please try again.");
        return;
      }

      setMessage("");
      dispatch(updateRefreshChatlist(true));
    });
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleSend();
  //   }
  // };

  useEffect(() => { 
      setMessage(""); 
  }, [id])
  

  return (
    <div className="message-composer flex w-full items-center justify-between">
      <textarea
        value={message}
        rows="1"
        disabled={isSending}
        maxLength={4000}
        aria-label="Write a message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); 
            handleSend();
          }
        }}
        className="message-field w-full h-full bg-slate-800 px-4 py-2 text-white font-medium border border-slate-800 rounded-lg focus-visible:outline-none resize-none custom-scrollbar"
        placeholder="Write a message…"
      />
      <div className="composer-tools"><span className="composer-shortcut">Enter to send. Shift+Enter for a new line.</span><span className="composer-count">{message.length}/4000</span><span className="composer-divider" /><IconButton icon={<IoSend />} tooltip={"Send message"} position="top" active={false} onClick={handleSend} /></div>
    </div>
  );
}

export default MessageInput;
