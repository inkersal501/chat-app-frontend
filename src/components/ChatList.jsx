import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux"; 
import UserCard from "./UserCard";
import chat from "../js/chat";
const ChatList = () => {

    const [chatList, setChatList] = useState([]);
    const user = useSelector(selectUser);
    const [msg, setMsg]  = useState("");

    useEffect(()=> {
        async function getChatList() {
            const result = await chat.getChatList(user.token);
            if (result.status && result.friends.length > 0) {
                setChatList(result.chatlist);
            } else if (!result.status) {
                setMsg(result.msg);
            }
        }
        getChatList();
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
            
            {chatList.length>0 && chatList.map((name, idx) => (
                <div key={idx} className={`${idx==0?'bg-slate-700':'bg-slate-800 hover:bg-slate-700'} border-b border-slate-700 px-4 py-2 transition cursor-pointer`}>
                    <UserCard name={name} />               
                </div>
            ))}
        </div>
    );
}
     
export default ChatList;