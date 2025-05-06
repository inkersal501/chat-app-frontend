import axios from "axios";
import {apiEndpoint} from "./config";

const getMessages = async (chatId, userToken) => {
    try {
        const result = await axios.get(`${apiEndpoint}/message/${chatId}`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){      
            return {status: true, messages: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response.data.msg};
    }
};


const sendMessage = async (chatId, userToken, content) => {
    try {
        const result = await axios.post(`${apiEndpoint}/message/send`, {chatId, content}, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){      
            return {status: true, messages: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response.data.msg};
    }
};

export default { getMessages, sendMessage };