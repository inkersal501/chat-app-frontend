import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import connect from "../js/connect";
import UserCard from "./UserCard";

const FriendList = () => {

    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [search, setSearch] = useState("");
    const user = useSelector(selectUser);    

    useEffect(() => {
        async function getFriends() {
            const result = await connect.getFriends(user.token);
            if (result.status && result.friends.length > 0) {
                setFriends(result.friends);
            }
        }
        getFriends();
        // eslint-disable-next-line
    }, []);

    useEffect(()=> {
        setFilteredFriends(friends);
    }, [friends]);

    const filterFriends = (search) => {
        const filtered = friends.filter((f) =>
            f.username.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredFriends(filtered);
    };
    useEffect(()=> {
        if(search === "")
            setFilteredFriends(friends);
        else
            filterFriends(search);
    //eslint-disable-next-line
    }, [search]);
    
    return (
        <div className="space-y-0">
            <div className='bg-slate-900'>
            <input 
                className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none" 
                type="text" 
                placeholder="Search friends"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            {filteredFriends.length > 0 ? filteredFriends.map((user, idx) => (
                <div key={idx} className="bg-slate-800 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
                    <UserCard name={user.username} type="friends" />
                </div> 
            )) : (
            <div className="p-4 text-gray-400">No friends found.</div>
            )} 
        </div>
    );
};

export default FriendList;
