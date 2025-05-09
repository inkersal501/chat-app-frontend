import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux"; 
import UserCard from "./UserCard";
import chat from "../js/chat";
import {activeChat , refreshChatlist, updateActiveChat, updateRefreshChatlist} from "../redux/chatSlice";
 
const ChatList = () => {

    const dispatch = useDispatch();
    const [chatList, setChatList] = useState([]);
    const [search, setSearch] = useState(""); 

    const user = useSelector(selectUser);
    const currentActiveChat = useSelector(activeChat);
    const isrefreshChatlist = useSelector(refreshChatlist);   

    useEffect(() => {
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
          }  
        }
    
        getChatList();
    
        if (isrefreshChatlist) {
          getChatList();
        }
      }, [isrefreshChatlist, user, currentActiveChat?.id, dispatch]);
     
    const filteredChatList = chatList.filter(chat => {
        const other = chat.participants.find(p => p._id !== user._id);
        const displayName = other ? other.username : "My Chat";
        return displayName.toLowerCase().includes(search.toLowerCase());
    });
    
    
    return (
        <div className="space-y-0">
            <div className='bg-slate-900'>
                <input 
                    className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none" 
                    type="text" 
                    placeholder="Search chats"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
             
            {filteredChatList.length > 0 ? (
                filteredChatList.map((chat, idx) => {
                    const participants = chat.participants;
                    const isSelfChat = participants.length === 0;                     
                    const displayName = isSelfChat?"My Chat":participants[0].username;
                    return (
                        <div key={idx} 
                            className={`${currentActiveChat.id === chat._id?`glass-bg`:`bg-slate-800 hover:bg-slate-700`} border-t border-slate-700 px-4 py-2 transition cursor-pointer`}
                            onClick={() => dispatch(updateActiveChat({ id: chat._id, username: displayName }))}
                        >
                            <UserCard name={displayName} />
                        </div>
                    );
                })
            ) : (
                <div className="p-4 text-gray-400">No chats found.</div>
            )}
        </div> 
    );
}
     
export default ChatList;