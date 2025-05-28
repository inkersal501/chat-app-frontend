import { IoSend } from "react-icons/io5";
import IconButton from "./IconButton";
import { useState, useEffect } from "react";
import { selectUser } from "../redux/authSlice";
import { activeChat, updateRefreshChatlist } from '../redux/chatSlice';
import { useDispatch, useSelector } from "react-redux";
import {messageJS} from "../js";
import {socketJS} from "../js";

function MessageInput() {

  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);
  const { id } = useSelector(activeChat); 
  const dispatch = useDispatch();
  
  const handleSend = async () => {
    if (message.trim() === "") return;
    const messageData =  {
      sender:{username: user.username, _id: user._id },
      content: message.trim(),
      roomId: id,
      createdAt: Date.now()
    }; 
    socketJS.emit("send_message", {roomId: id, message: messageData});

    await messageJS.sendMessage(id, user.token, message); 
    dispatch(updateRefreshChatlist(true));
    setMessage("");
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
    <div className="flex w-full items-center justify-between">
      <textarea
        value={message}
        rows="1"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); 
            handleSend();
          }
        }}
        className="w-full h-full bg-slate-800 px-4 py-2 text-white font-medium border border-slate-800 rounded-lg focus-visible:outline-none resize-none custom-scrollbar"
        placeholder="Type a message"
      />
      <div className="ms-4">
        <IconButton icon={<IoSend />} tooltip={""} position="" active={false} onClick={handleSend} />
      </div>
    </div>
  );
}

export default MessageInput;
