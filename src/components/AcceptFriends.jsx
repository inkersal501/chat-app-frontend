import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import connect from "../js/connect";
import UserCard from "./UserCard";

function AcceptFriends() {

  const [reqUsers, setReqUsers] = useState([]);
  const user = useSelector(selectUser);

  useEffect(()=>{
    async function getRequests () {
      const result = await connect.getRequests(user.token);
      if(result.length>0)
        setReqUsers(result);
    }
    getRequests();
    //eslint-disable-next-line
  }, []);

  const acceptRequest = async (toUserId) => {
    console.log("clicked");
    await connect.acceptRequest(toUserId, user.token);
  };

  return (
    <div className="space-y-0">
      <div className='bg-slate-900'>
        <input 
          className="w-full bg-slate-800 px-4 py-2 text-white font-medium focus-visible:outline-none" 
          type="text" 
          placeholder="Search..."
        />
      </div>
        {reqUsers.map((user, idx) => (
            <div key={idx} className="bg-slate-800 p-4 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
              <UserCard name={user.username} type={"accept"} onActionClick={()=>acceptRequest(user._id)}/> 
            </div>
        ))}
    </div>
  )
}

export default AcceptFriends;