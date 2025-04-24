import { IoSend } from "react-icons/io5";
import IconButton from "./IconButton";
 
function MessageInput() {
  return (
    <div className="flex w-full items-center justify-between">
      <input 
        className="w-full bg-slate-800 px-4 py-2 text-white font-medium border border-slate-800 rounded-lg focus-visible:outline-none" 
        type="text" 
        placeholder="Type a message"
      />
      <div className="ms-4">
        <IconButton icon={<IoSend />} tooltip={"Send"} position="top" active={false} /> 
      </div>
    </div>
  )
}

export default MessageInput;