import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import TopBar from '../components/TopBar';

function Home() {
    return (
        <div className="h-screen w-screen flex flex-col">
            <TopBar />
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <Sidebar />
                <ChatWindow />
            </div>
        </div>
    );
}

export default Home;
