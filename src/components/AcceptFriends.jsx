import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import connect from "../js/connect";
import UserCard from "./UserCard";
import { useDispatch } from 'react-redux';
import { updateSidebarActiveTab } from '../redux/chatSlice';
import Button from './Button';

function AcceptFriends() {

  const dispatch = useDispatch();
  const [reqUsers, setReqUsers] = useState([]);
  const [msg, setMsg]  = useState("");
  const user = useSelector(selectUser);

  useEffect(()=>{
    async function getRequests () {
      const result = await connect.getRequests(user.token);
      if(result.status && result.requests.length>0){
        setReqUsers(result.requests);
      }else if(!result.status || (result.status && result.requests.length===0)) {
        setMsg("No requests found.");
      }        
    }
    getRequests();
    //eslint-disable-next-line
  }, []);

  const acceptRequest = async (fromUserId) => {
    console.log("clicked");
    await connect.acceptRequest(fromUserId, user.token);
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
      {msg!=="" && 
      <>
      <div className='px-4 py-2'>{msg}</div>
        {reqUsers.length === 0 && 
        <div className='text-center'>
          <Button onClick={()=>dispatch(updateSidebarActiveTab("add-friends"))}>Find Friends</Button>
        </div>
        }        
      </>
      }
        {reqUsers.length > 0 && reqUsers.map((user, idx) => (
            <div key={idx} className="bg-slate-800 p-4 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
              <UserCard name={user.username} type={"accept"} onActionClick={()=>acceptRequest(user._id)}/> 
            </div>
        ))}
    </div>
  )
}

export default AcceptFriends;