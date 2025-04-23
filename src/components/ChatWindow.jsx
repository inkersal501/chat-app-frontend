import MessageInput from "./MessageInput";

function ChatWindow() {
  return (
    <div className='w-4/6 min-h-100'>
      <div className="h-[90%] bg-slate-800 ">
        <h2 className="text-xl font-bold capitalize p-4 border-b-1 border-slate-700">My Chat</h2>
      </div>
      <div className="h-[10%] bg-slate-900 flex items-center px-4"> 
        <MessageInput /> 
      </div>
    </div>
  )
}

export default ChatWindow;