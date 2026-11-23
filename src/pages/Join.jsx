import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { updateIsLogin } from "../redux/authSlice";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

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
                        title: "Join me on Convo!",
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
        <div className="join-page flex flex-col gap-4 items-center justify-center min-h-screen w-full bg-slate-900 px-4">
            <div className="join-card">
            <div><Logo width="20" /></div>
            <p className="story-kicker">GOOD CONVERSATIONS START HERE</p>
            <h1 className="text-3xl font-bold">Make room for<br/><span>your people.</span></h1>
            <p className="join-description">Invite a friend into Convo and keep the conversation close.</p>
            <div className="flex items-center justify-center">
                <div>
                    <Button onClick={()=>{dispatch(updateIsLogin(false));navigate("/login")}} className="md:text-base">Create your account</Button>
                </div>
                <div></div>
            </div>
            <div className='join-invite flex flex-col gap-3 mt-5'>
                <p className="text-sm text-gray-500">Your invite link</p>

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
        </div>
    );
}

export default Join;
