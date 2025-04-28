import UserCard from "./UserCard";

const FriendList = () => (
    <div className="space-y-0">
        <div className='bg-slate-900'>
            <input 
            className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none" 
            type="text" 
            placeholder="Search friends"
            />
        </div>
        {['Friend1', 'Friend2', 'Friend3'].map((name, idx) => (
            <div key={idx} className="bg-slate-800 p-4 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
                <UserCard name={name} /> 
            </div>
        ))}
    </div>
);
export default FriendList;