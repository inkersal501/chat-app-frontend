const ChatList = () => (
    <div className="space-y-4">
        {['User1', 'User2', 'User3'].map((name, idx) => (
            <div key={idx} className="bg-slate-700 p-3 rounded-md hover:bg-slate-600 transition cursor-pointer">
                {name}
            </div>
        ))}
    </div>
);
export default ChatList;