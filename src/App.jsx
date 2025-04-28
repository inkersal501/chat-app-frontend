import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';  
import Index from './pages/Index';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/authSlice';
 
function App() {
  const user = useSelector(selectUser);
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Index />} />
        {user && user.token != "" && <Route path='/home' element={<Home />} /> }
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
