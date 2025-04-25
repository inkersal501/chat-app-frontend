import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaComments, FaUserFriends, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdPersonAdd, MdPersonAddAlt1 } from "react-icons/md";
import ChatList from './ChatList';
import FriendList from './FriendList';
import SettingsPanel from './SettingsPanel';
import IconButton from './IconButton';
import AddFriends from './AddFriends';
import AcceptFriends from './AcceptFriends';

const sidebarTabs = [
  {
    key: "chats",
    label: "Chats",
    icon: <FaComments />,
    component: <ChatList />,
  },
  {
    key: "friends",
    label: "Friends",
    icon: <FaUserFriends />,
    component: <FriendList />,
  },
  {
    key: "add-friends",
    label: "Add Friends",
    icon: <MdPersonAddAlt1 />,
    component: <AddFriends />,
  },
  {
    key: "accept-friends",
    label: "Accept Friends",
    icon: <MdPersonAdd />,
    component: <AcceptFriends />,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <FaCog />,
    component: <SettingsPanel />,
  },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useState('chats');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-2/6 h-full flex overflow-hidden">
      {/* Icon panel */}
      <div className="w-20 bg-slate-900 text-white flex flex-col items-center py-4 space-y-6 shadow-lg">
        {sidebarTabs.map((tab) => (
          <IconButton
            key={tab.key}
            icon={tab.icon}
            tooltip={tab.label}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            position="right"
          />
        ))}
        <div className="mt-auto">
          <IconButton
            icon={<FaSignOutAlt />}
            tooltip={"Logout"}
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            position="right"
          />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-slate-800 text-white overflow-y-auto border-e border-slate-600">
        <h2 className="text-xl font-bold capitalize p-4 border-b border-slate-700">{activeTab}</h2>
        {sidebarTabs.map((tab) =>
          activeTab === tab.key ? <div key={tab.key}>{tab.component}</div> : null
        )}
      </div>
    </div>
  );
}

export default Sidebar;
