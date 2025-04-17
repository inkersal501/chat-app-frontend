import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';  
import Index from './pages/Index';
import Home from './pages/Home';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Index />} />
        <Route path='/home' element={<Home />} />

      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
