import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux"; 
import UserCard from "./UserCard";
import {chatJS} from "../js";
import {activeChat , refreshChatlist, updateActiveChat, updateRefreshChatlist} from "../redux/chatSlice";
import useIsMobile from '../hooks/useIsMobile';

const ChatList = () => {

    const dispatch = useDispatch();
    const [chatList, setChatList] = useState([]);
    const [search, setSearch] = useState(""); 
    const [loading, setLoading] = useState(true);

    const user = useSelector(selectUser);
    const currentActiveChat = useSelector(activeChat);
    const isrefreshChatlist = useSelector(refreshChatlist);   
    const isMobile = useIsMobile();

    useEffect(() => {
        async function getChatList() {
            setLoading(true);
            const result = await chatJS.getChatList(user.token);
            if (result.status) {
                setChatList(result.chatlist);
                if(!isMobile){
                    if (!currentActiveChat?.id) {
                        const firstChat = result.chatlist[0];
                        const firstParticipant = firstChat.participants.find(p => p._id !== user._id);
                        const firstName = firstParticipant ? firstParticipant.username : "My Chat";
                        dispatch(updateActiveChat({ id: firstChat._id, username: firstName }));
                    }
                }            
                dispatch(updateRefreshChatlist(false));
            }  
            setLoading(false);
        }
    
        getChatList();
    
        if (isrefreshChatlist) {
            getChatList();
        }
        //eslint-disable-next-line
      }, [isrefreshChatlist, user, currentActiveChat?.id, isMobile]);
     
    const filteredChatList = chatList.filter(chat => {
        const other = chat.participants.find(p => p._id !== user._id);
        const displayName = other ? other.username : "My Chat";
        return displayName.toLowerCase().includes(search.toLowerCase());
    });

    const handleOpenChat = (id, username) => {          
        dispatch(updateActiveChat({ id, username}))
    }
   
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
            {loading ? 
                (<div className="p-4 text-gray-400">Loading...</div>)
                :
                filteredChatList.length > 0 ? (
                filteredChatList.map((chat, index) => {
                    const participants = chat.participants;
                    const isSelfChat = participants.length === 0;                     
                    const displayName = isSelfChat?"My Chat":participants[0].username;
                    return (
                        <div key={index} 
                            className={`${currentActiveChat.id === chat._id?`glass-bg`:`bg-slate-800 hover:bg-slate-700`} border-t border-slate-700 px-4 py-2 transition cursor-pointer`}
                            onClick={() => handleOpenChat(chat._id, displayName)}
                        >
                            <UserCard name={displayName} />
                        </div>
                    );
                })
                ) : ( <div className="p-4 text-gray-400">No chats found.</div> )
            }
        </div> 
    );
}
     
export default ChatList;