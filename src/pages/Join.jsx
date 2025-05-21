import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { updateIsLogin } from "../redux/authSlice"; 
import { toast } from "react-toastify";

function Join() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [copied, setCopied] = useState(false);
        const inviteLink = window.location.origin+"/join";
    
        const handleCopy = () => {
            navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };
    
        const handleShare = async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Join me on this chat app!",
                        text: "Let's chat here:",
                        url: inviteLink,
                    });
                } catch (error) {
                    console.error("Sharing failed:", error);
                }
            } else {
                toast.info("Sharing not supported. Try copying the link instead.");
            }
        };
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen w-full bg-slate-900 px-4">
            <h1 className="text-3xl font-bold">Join in this Chat App</h1>
            <div className="flex items-center justify-center">
                <div>
                    <Button onClick={()=>{dispatch(updateIsLogin(false));navigate("/")}} className="md:text-base">SignUp Today.!</Button>
                </div>
                <div></div>
            </div>
            <div className='flex flex-col gap-3 mt-5'> 
                <p className="text-sm text-gray-500">Share the chat app link with your friends:</p>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="border rounded px-3 py-2 w-full text-sm bg-slate-700"
                    />                    
                </div> 
                <div className='flex gap-3 justify-center'>
                    <Button onClick={handleCopy}>{copied ? "Copied!" : "Copy"}</Button> 
                    <Button onClick={handleShare}>Share via Device</Button> 
                </div>

                
            </div>
        </div>
    );
}

export default Join;
