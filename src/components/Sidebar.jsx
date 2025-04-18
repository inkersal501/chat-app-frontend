import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaComments, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";
import ChatList from './ChatList';
import FriendList from './FriendList';
import SettingsPanel from './SettingsPanel';
 
function Sidebar() {
    const [activeTab, setActiveTab] = useState('chats');
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    return (
        <div className="w-2/6">
        <div className="flex h-screen">
        
            <div className="w-20 bg-slate-900 text-white flex flex-col items-center py-4 space-y-6 shadow-lg">
                <IconButton icon={<FaComments />} active={activeTab === 'chats'} onClick={() => setActiveTab('chats')} />
                <IconButton icon={<FaUserFriends />} active={activeTab === 'friends'} onClick={() => setActiveTab('friends')} />
                <IconButton icon={<FaCog />} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                <div className="mt-auto">
                    <IconButton icon={<FaSignOutAlt />} onClick={() => {
                        dispatch(logout());
                        navigate("/");
                    }} />
                </div>
            </div>
        
            <div className="w-120 bg-slate-800 text-white p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 capitalize">{activeTab}</h2>

                {activeTab === 'chats' && <ChatList />}
                {activeTab === 'friends' && <FriendList />}
                {activeTab === 'settings' && <SettingsPanel />}
            </div>
        
        </div>
        </div>
    );
}
 
const IconButton = ({ icon, active, onClick }) => (
    <button
      className={`text-xl p-3 rounded-lg cursor-pointer hover:bg-slate-700 ${active ? 'bg-slate-700' : ''}`}
      onClick={onClick}
    >
        {icon}
    </button>
);

export default Sidebar