import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import TopBar from "../components/TopBar";
import Feed from "../components/Feed";
import People from "../components/People";
import "../social.css";

const feedEnabled = import.meta.env.VITE_CONVO_FEED_ENABLED === "true" ||
    (import.meta.env.DEV && import.meta.env.VITE_CONVO_FEED_ENABLED !== "false");
const sections = feedEnabled ? ["Chats", "Feed", "People"] : ["Chats", "People"];

function Home() {
    const [section, setSection] = useState("Chats");
    return <div className="chat-shell h-screen w-screen flex flex-col">
        <TopBar />
        <nav className="social-tabs" aria-label="Main navigation">
            {sections.map((item) => <button key={item} aria-current={section === item ? "page" : undefined}
                onClick={() => setSection(item)}>{item}</button>)}
        </nav>
        <main className="flex flex-1 min-h-0 overflow-hidden">
            {section === "Chats" && <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-slate-800">
                <Sidebar />
                <ChatWindow />
            </div>}
            {section === "Feed" && <Feed />}
            {section === "People" && <People />}
        </main>
    </div>;
}

export default Home;
