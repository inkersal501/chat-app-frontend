import MessageInput from "./MessageInput";

function ChatWindow() {
  return (
    <div className="w-4/6 h-full flex flex-col">
      {/* Chat area */}
      <div className="flex-1 bg-slate-800 overflow-y-auto">
        <h2 className="text-xl font-bold capitalize p-4 border-b border-slate-700">My Chat</h2>
        <div className="p-4">
          {/* Chat messages would go here */}
        </div>
      </div>

      {/* Message input */}
      <div className="h-16 bg-slate-900 flex items-center px-4 border-t border-slate-700">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatWindow;
