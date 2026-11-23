import axios from "axios";
import {apiEndpoint} from "./config";
import { toast } from "react-toastify";

const updateUsername = async (username)=>{
    try {
        const result = await axios.patch(`${apiEndpoint}/user/username`, {username});
        if(result.status === 200){
            toast.success(result.data.msg);
            return result.data.user;
        }
    } catch (error) {
        toast.error(error.response?.data?.msg || "Unable to update your username.");
        return false;
    }
};

const getSessionUser = async () => {
    try {
        const result = await axios.get(`${apiEndpoint}/user/me`, { timeout: 4500 });
        return result.status === 200 ? result.data.user : null;
    } catch {
        return null;
    }
};

const logout = async () => {
    try {
        await axios.post(`${apiEndpoint}/user/logout`);
        return true;
    } catch (error) {
        toast.error(error.response?.data?.msg || "Could not reach the server to end your session.");
        return false;
    }
};

export default { updateUsername, getSessionUser, logout };
