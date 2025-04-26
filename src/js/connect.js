import axios from "axios";
import apiEndpoint from "./config";
import { toast } from "react-toastify";

  
const getSuggestions = async (userToken) => {

    try {
        const result = await axios.get(`${apiEndpoint}/connect/suggestions`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){        
            return result.data.list;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
};

const sendRequest = async (toUserId, userToken) => {
    try {
        const result = await axios.post(`${apiEndpoint}/connect/request/${toUserId}`,{}, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){       
            toast.success(result.data.msg); 
            return true;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
};

const getRequests = async (userToken)=> {
    try {
        const result = await axios.get(`${apiEndpoint}/connect/requests`, { 
            headers: { Authorization: `Bearer ${userToken}`}
        });
        if(result.status === 200){        
            return result.data.list;
        }            
    } catch (error) {  
        toast.error(error.response.data.msg);
        return false;
    }
}
export default { getSuggestions, sendRequest, getRequests };