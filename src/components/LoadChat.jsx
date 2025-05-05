import React, { useState, useEffect } from 'react';
import message from "../js/message";
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux"; 

function LoadChat({ chatId }) {
 
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(selectUser);

    useEffect(() => {
        async function fetchMessages() {
            if (!chatId) return;
            setLoading(true);
            const res = await message.getMessages(chatId, user.token);
            if (res.status) {
                setMessages(res.messages);
            }
            setLoading(false);
        }
        fetchMessages(); 
        // eslint-disable-next-line
    }, [chatId]);
 
    if (loading) return <div className="text-white p-4">Loading chat...</div>;

    return (
        <div>
            {messages.length === 0 && <div className='px-4 py-2'>Start Chat...</div>}
            {messages.length > 0 &&
                <div className="p-4 text-white space-y-2">
                {messages.map((msg, idx) => {
                    const isSender = msg.sender._id === user._id;
                    return (
                 
                        <div className={`flex items-center gap-3 ${isSender ? 'flex-row-reverse':''}`} key={idx}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900
                            bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase">
                            {msg.sender.username[0]}
                            </div>
                            <div className={`p-2 px-4 rounded-xl max-w-[90%] ${isSender ? 'bg-gray-800 border border-gray-700' : 'glass-bg'} text-white self-start`}>
                                <p><strong>{msg.sender.username}</strong></p>
                                <p className='whitespace-pre'>{msg.content}</p>
                            </div>
                        </div>                         
                    )
                    })}
                </div>
            }
        </div>
        );
}

export default LoadChat;
