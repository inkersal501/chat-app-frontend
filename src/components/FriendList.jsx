 
const FriendList = () => (
    <div className="space-y-4">
        {['Friend1', 'Friend2', 'Friend3'].map((name, idx) => (
            <div key={idx} className="bg-slate-700 p-3 rounded-md hover:bg-slate-600 transition cursor-pointer">
                {name}
            </div>
        ))}
    </div>
);
export default FriendList;