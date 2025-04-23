const ChatList = () => (
    <div className="space-y-0">
        {['My Chat', 'User1', 'User2', 'User3'].map((name, idx) => (
            <div key={idx} className={`${idx==0?'bg-slate-700':'bg-slate-800 hover:bg-slate-700'} border-b border-slate-700 p-4 transition cursor-pointer`}>
                {name}
            </div>
        ))}
    </div>
);
export default ChatList;