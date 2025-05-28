import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import TopBar from '../components/TopBar';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import { useEffect } from "react";

function Home() {
    
  const navigate = useNavigate(); 
  const user = useSelector(selectUser);

  useEffect(()=>{    
    if(user) 
      navigate("/home");
    //eslint-disable-next-line
  }, []);
    return (
        <div className="h-screen w-screen flex flex-col">
            <TopBar />
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-slate-800">
                <Sidebar />
                <ChatWindow />
            </div>
        </div>
    );
}

export default Home;
