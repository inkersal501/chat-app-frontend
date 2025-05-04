import React, {useState, useEffect} from 'react'
import message from "../js/message";
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux"; 

function LoadChat({chatId}) {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(selectUser);

    useEffect(() => {
        async function fetchMessages() {
          if (!chatId) return;    
            const res = await message.getMessages(chatId, user.token); 
            if (res.status) {
                setMessages(res.messages);
            }
            setLoading(false);
        }
        fetchMessages();
        //eslint-disable-next-line
    }, [chatId]);


    
    if (loading) return <div className="text-white p-4">Loading chat...</div>;

    return (
        <div>
            {messages.length == 0 && <div className='px-4 py-2'>Start Chat...</div>}
            {messages.length > 0 &&  
                <div className="p-4 text-white space-y-2">
                    {messages.map((msg, idx) => (

                        <div key={idx}>
                            <strong>{msg.sender.username}:</strong> {msg.content}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default LoadChat