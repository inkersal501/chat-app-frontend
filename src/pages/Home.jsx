import React from 'react';

import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

function Home() {
   
    return (
        <div className='bg-black min-h-100 flex w-full'>
            <Sidebar />
            <ChatWindow />             
        </div>

    )
}

export default Home;