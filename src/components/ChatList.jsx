import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux"; 
import UserCard from "./UserCard";
import chat from "../js/chat";
import {updateActiveChat} from "../redux/chatSlice";
 
const ChatList = () => {

    const dispatch = useDispatch();
    const [chatList, setChatList] = useState([]);
    const user = useSelector(selectUser);
    const [msg, setMsg]  = useState("");

    useEffect(()=> {
        async function getChatList() {
            const result = await chat.getChatList(user.token);
            if (result.status && result.chatlist.length > 0) {
                setChatList(result.chatlist);
            } else if (!result.status) {
                setMsg(result.msg);
            }
        }
        getChatList();
        // eslint-disable-next-line
    }, []);
    const setOpenChat = (chatId, chatUsername) => {
        dispatch(updateActiveChat({id : chatId, username : chatUsername}));
    };
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
            
            {chatList.length > 0 && chatList.map((chat, idx) => { 
                const otherParticipant = chat.participants.find(p => p._id !== user._id);
                const displayName = otherParticipant ? otherParticipant.username : "My Chat";

                return (
                    <div
                        key={idx}
                        className="bg-slate-800 hover:bg-slate-700 border-b border-slate-700 px-4 py-2 transition cursor-pointer"
                        onClick={() => setOpenChat(chat._id, displayName)}
                    >
                        <UserCard name={displayName} />
                    </div>
                );
            })}
        </div>
    );
}
     
export default ChatList;