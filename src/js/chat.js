import axios from "axios";
import {apiEndpoint} from "./config";

const getChatList = async () => {

    try {
        const result = await axios.get(`${apiEndpoint}/chat/chatlist`);
        if(result.status === 200){      
            return {status: true, chatlist: result.data.list};
        }            
    } catch (error) {  
        return {status: false, msg: error.response?.data?.msg || "Unable to load your chats."};
    }
};



export default { getChatList };
