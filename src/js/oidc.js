import axios from "axios";
import { apiEndpoint } from "./config";

export const oidcEnabled = import.meta.env.VITE_CONVO_OIDC_ENABLED === "true";
export const oidcEndpoint = `${apiEndpoint}/user/oidc`;

export async function startOidcLink() {
    const { data } = await axios.post(oidcEndpoint + "/link");
    window.location.assign(data.url);
}
