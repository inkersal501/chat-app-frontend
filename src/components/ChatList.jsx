import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux"; 
import UserCard from "./UserCard";
import chat from "../js/chat";
import {activeChat , refreshChatlist, updateActiveChat, updateRefreshChatlist} from "../redux/chatSlice";
 
const ChatList = () => {

    const dispatch = useDispatch();
    const [chatList, setChatList] = useState([]);
    const user = useSelector(selectUser);
    const currentActiveChat = useSelector(activeChat);
    const isrefreshChatlist = useSelector(refreshChatlist);
    const [msg, setMsg]  = useState("");
 

    useEffect(()=> {
        async function getChatList() {
            const result = await chat.getChatList(user.token);
            if (result.status && result.chatlist.length > 0) {
              setChatList(result.chatlist);
         
              if (!currentActiveChat?.id) {
                const firstChat = result.chatlist[0];
                const firstParticipant = firstChat.participants.find(p => p._id !== user._id);
                const firstName = firstParticipant ? firstParticipant.username : "My Chat";
                dispatch(updateActiveChat({ id: firstChat._id, username: firstName }));
              }
        
              dispatch(updateRefreshChatlist(false));
            } else if (!result.status) {
              setMsg(result.msg);
            }
          }
        
          // Load once on component mount
          getChatList();
        
          // Load again if refreshChat becomes true
          if (isrefreshChatlist) {
            getChatList();
          }  
        // eslint-disable-next-line
    }, [isrefreshChatlist]);
    
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
                        className={`${currentActiveChat.id===chat._id? `glass-bg`:`bg-slate-800 hover:bg-slate-700`} border-t border-slate-700 px-4 py-2 transition cursor-pointer`}
                        onClick={() => dispatch(updateActiveChat({ id: chat._id, username: displayName }))}
                    >
                        <UserCard name={displayName} />
                    </div>
                );
            })}
        </div>
    );
}
     
export default ChatList;