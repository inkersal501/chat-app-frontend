import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth"; 
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
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-900 px-4">
      <Auth />
    </div>
  );
}

export default Index;