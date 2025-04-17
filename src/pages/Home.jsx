import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
 
function Home() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    return (
        <div className='bg-black'>
        <div>Home</div>
        <a href="#" onClick={()=>{ dispatch(logout()); navigate("/")}}>Logout</a>
        </div>

    )
}

export default Home;