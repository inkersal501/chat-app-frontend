import axios from "axios";
import {apiEndpoint} from "./config";

const getMessages = async (chatId, { before, signal } = {}) => {
    try {
        const result = await axios.get(`${apiEndpoint}/message/${chatId}`, { params: { before }, signal });
        if(result.status === 200){      
            return {status: true, messages: result.data.list, nextCursor: result.data.nextCursor ?? null};
        }            
    } catch (error) {  
        return {status: false, msg: error.response?.data?.msg || "Unable to load messages."};
    }
};

const sendMessage = async (chatId, content) => {
    try {
        const result = await axios.post(`${apiEndpoint}/message/send`, {chatId, content});
        if(result.status === 200){      
            return {status: true, messages: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response?.data?.msg || "Unable to send this message."};
    }
};

const convertDatetoTime = (date) => {
    const dateTime = new Date(date);  
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; 
    const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    return time;
};

function getMessageDate(dateString) {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return messageDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
} 

export default { getMessages, sendMessage, convertDatetoTime, getMessageDate };
