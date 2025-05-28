import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';  
import Index from './pages/Index';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './redux/authSlice';
import Join from './pages/Join';
 
function App() {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to="/home" /> : <Index />} />
        <Route path='/join' element={<Join />} />
        <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/" />} /> 
        <Route path="*" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
