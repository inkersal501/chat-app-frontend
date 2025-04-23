import UserCard from "./UserCard";

const FriendList = () => (
    <div className="space-y-0">
        {['Friend1', 'Friend2', 'Friend3'].map((name, idx) => (
            <div key={idx} className="bg-slate-800 p-4 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
                <UserCard name={name} /> 
            </div>
        ))}
    </div>
);
export default FriendList;