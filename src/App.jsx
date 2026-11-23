import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';  
import './motion.css';
import './chat-polish.css';
import Index from './pages/Index';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './redux/authSlice';
import Join from './pages/Join';
import Landing from './pages/Landing';
import { login, logout } from './redux/authSlice';
import { socketJS, userJS } from './js';
 
function App() {
  const dispatch = useDispatch();
  const [sessionReady, setSessionReady] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    let mounted = true;
    userJS.getSessionUser().then((user) => {
      if (!mounted) return;
      if (user) {
        dispatch(login(user));
        socketJS.connect();
      } else {
        dispatch(logout());
      }
      setSessionReady(true);
    });
    return () => { mounted = false; };
  }, [dispatch]);

  if (!sessionReady) {
    return <main className="session-loading"><span className="convo-logo">c<span>.</span></span><p>Getting your space ready…</p></main>;
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to="/home" /> : <Landing />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to="/home" /> : <Index />} />
        <Route path='/join' element={<Join />} />
        <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/" />} /> 
        <Route path="*" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
