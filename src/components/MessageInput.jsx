import { IoSend } from "react-icons/io5";
import IconButton from "./IconButton";
import { useState } from "react";
import { selectUser } from "../redux/authSlice";
import { activeChat, updateRefreshChat } from '../redux/chatSlice';
import { useDispatch, useSelector } from "react-redux"; 
import messageJs from "../js/message";


function MessageInput() {

  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);
  const {id} = useSelector(activeChat);
  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim() === "") return;
    messageJs.sendMessage(id, user.token, message);
    dispatch(updateRefreshChat(true));
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-slate-800 px-4 py-2 text-white font-medium border border-slate-800 rounded-lg focus-visible:outline-none"
        type="text"
        placeholder="Type a message"
      />
      <div className="ms-4">
        <IconButton icon={<IoSend />} tooltip={"Send"} position="top" active={false} onClick={handleSend} />
      </div>
    </div>
  );
}

export default MessageInput;
