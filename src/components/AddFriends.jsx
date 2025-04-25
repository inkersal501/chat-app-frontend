import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import connect from "../js/connect";
import UserCard from "./UserCard";

function AddFriends() {
  const [sugg, setSugg] = useState([]);
  const user = useSelector(selectUser);

  useEffect(()=>{
    async function getSuggestions () {
      const result = await connect.getSuggestions(user.token);
      setSugg(result);
    }
    getSuggestions();
    //eslint-disable-next-line
  }, []);

  const sendRequest = async (toUserId) => {
    console.log("clicked");
    await connect.sendRequest(toUserId, user.token);
  };

  return (
    <div className="space-y-0">
      <div className='bg-slate-900'>
        <input 
          className="w-full bg-slate-800 px-4 py-2 text-white font-medium focus-visible:outline-none" 
          type="text" 
          placeholder="Search for friends"
        />
      </div>
        {sugg.map((user, idx) => (
            <div key={idx} className="bg-slate-800 p-4 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
                <UserCard name={user.username} type={"send"} onActionClick={()=>sendRequest(user._id)}/> 
            </div>
        ))}
    </div>
  )
}

export default AddFriends