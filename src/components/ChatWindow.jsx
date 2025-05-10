import { useDispatch, useSelector } from "react-redux";
import { activeChat, updateActiveChat } from '../redux/chatSlice';
import LoadChat from "./LoadChat";
import MessageInput from "./MessageInput";
import socket from "../js/server";
import { useEffect, useState } from "react";
import useIsMobile from '../hooks/useIsMobile';
import { MdArrowBack } from "react-icons/md";
import IconButton from "./IconButton";
 
function ChatWindow() {

  const dispatch = useDispatch();
  const { id, username } = useSelector(activeChat);
  const [showChat, setShowChat] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if(id) {
      socket.emit("join_room", id);
      setShowChat(true);
    }else if(id === null){
      setShowChat(false);
    }
  }, [id]);
  
  const handleBack = () => {
    dispatch(updateActiveChat({ id: null, username: null}));
  };
  return (
    <>
    {showChat && 
    <div className={`w-full md:w-4/6 ${isMobile?'h-8/9':'h-1/2'} md:h-full flex flex-col bg-slate-800`}>
      
      {/*Chat Header*/}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800 z-10">
        <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900
        bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase">
          {username?username[0]:""}
        </div>
        <h2 className="ms-3 text-xl font-bold capitalize">{username}</h2>
        </div>
        {isMobile && 
        <div>
          <IconButton
            icon={<MdArrowBack />}
            tooltip="Back"
            onClick={handleBack}
            position="right"
          />          
        </div>}
      </div>

      {/*Chat Messages*/}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <LoadChat chatId={id} />
      </div>

      {/*Message Input*/}
      <div className="h-16 bg-slate-900 flex items-center px-4 border-t border-slate-700 overflow-hidden">
        <MessageInput />
      </div>
    </div>
    }
    </>
  );
}

export default ChatWindow;
