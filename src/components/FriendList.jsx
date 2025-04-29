import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import connect from "../js/connect";
import UserCard from "./UserCard";

const FriendList = () => {

    const [friends, setFriends] = useState([]);
    const user = useSelector(selectUser);
    const [msg, setMsg]  = useState("");

    useEffect(() => {
        async function getFriends() {
            const result = await connect.getFriends(user.token);
            if (result.status && result.friends.length > 0) {
                setFriends(result.friends);
            } else if (!result.status) {
                setMsg(result.msg);
            }
        }
        getFriends();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="space-y-0">
            <div className='bg-slate-900'>
                <input 
                    className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none" 
                    type="text" 
                    placeholder="Search friends"
                />
            </div>

            {msg !== "" && (
                <div className='px-4 py-2'>{msg}</div>
            )}

            {friends.length > 0 && friends.map((user, idx) => (
                <div key={idx} className="bg-slate-800 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
                    <UserCard name={user.username} type="friends" />
                </div>
            ))}
        </div>
    );
};

export default FriendList;
