import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
import { FaLock, FaBolt, FaUserFriends } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/authSlice';
import { useEffect } from "react";

function Index() {
   
  const navigate = useNavigate(); 
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(()=>{    
    if(isLoggedIn) 
      navigate("/home");
    //eslint-disable-next-line
  }, []);

  return (
    <main className="auth-page flex items-center justify-center min-h-screen w-full bg-slate-900 px-4">
      <section className="auth-story">
        <a className="story-brand" href="/"><span className="story-mark">c<span>.</span></span><span>convo</span></a>
        <div className="story-copy"><p className="story-kicker">A LITTLE CLOSER, EVERY DAY</p><h1>Your people.<br/>Your conversations.<br/><span>All in one place.</span></h1><p>Make room for the conversations that make your day. A calm, simple space to stay connected.</p></div>
        <div className="story-features"><span><FaLock/> Private by design</span><span><FaBolt/> Real-time chat</span><span><FaUserFriends/> Friends first</span></div>
        <div className="story-orb orb-a"/><div className="story-orb orb-b"/><div className="story-grid"/>
      </section>
      <Auth />
    </main>
  );
}

export default Index;
