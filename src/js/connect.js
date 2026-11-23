import axios from "axios";
import { apiEndpoint } from "./config";
import { toast } from "react-toastify";

const requestError = (error, fallback) => error.response?.data?.msg || fallback;

const getSuggestions = async () => {
    try {
        const result = await axios.get(`${apiEndpoint}/connect/suggestions`);
        return { status: true, suggestions: result.data.list || [] };
    } catch (error) {
        return { status: false, msg: requestError(error, "Unable to load suggestions.") };
    }
};

const sendRequest = async (toUserId) => {
    try {
        await axios.post(`${apiEndpoint}/connect/request/${toUserId}`, {});
        toast.success("Friend request sent.");
        return true;
    } catch (error) {
        toast.error(requestError(error, "Could not send the friend request."));
        return false;
    }
};

const getRequests = async () => {
    try {
        const result = await axios.get(`${apiEndpoint}/connect/requests`);
        return { status: true, requests: result.data.list || [] };
    } catch (error) {
        return { status: false, msg: requestError(error, "Unable to load friend requests.") };
    }
};

const acceptRequest = async (fromUserId) => {
    try {
        await axios.post(`${apiEndpoint}/connect/accept/${fromUserId}`, {});
        toast.success("You’re friends now.");
        return true;
    } catch (error) {
        toast.error(requestError(error, "Could not accept this request."));
        return false;
    }
};

const declineRequest = async (fromUserId) => {
    try {
        await axios.post(`${apiEndpoint}/connect/decline/${fromUserId}`, {});
        return true;
    } catch (error) {
        toast.error(requestError(error, "Could not decline this request."));
        return false;
    }
};

const getFriends = async () => {
    try {
        const result = await axios.get(`${apiEndpoint}/connect/friends`);
        return { status: true, friends: result.data.list || [] };
    } catch (error) {
        return { status: false, msg: requestError(error, "Unable to load friends.") };
    }
};

export default { getSuggestions, sendRequest, getRequests, acceptRequest, getFriends, declineRequest };
