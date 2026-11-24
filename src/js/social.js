import axios from "axios";
import { apiEndpoint } from "./config";

export async function social(path, { method = "GET", data, params, signal } = {}) {
    const result = await axios({ url: `${apiEndpoint}/social${path}`, method, data, params, signal });
    return result.data;
}

export function socialError(error) {
    return error.response?.data?.msg || "Could not complete this action. Try again.";
}
