import { useDispatch, useSelector } from "react-redux";
import { activeChat, updateActiveChat } from '../redux/chatSlice';
import LoadChat from "./LoadChat";
import MessageInput from "./MessageInput";
import {socketJS} from "../js";
import { useEffect, useState } from "react";
import useIsMobile from '../hooks/useIsMobile';
import { MdArrowBack } from "react-icons/md";
import IconButton from "./IconButton";
import { FaComments } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
 
function ChatWindow() {

  const dispatch = useDispatch();
  const { id, username } = useSelector(activeChat);
  const [showChat, setShowChat] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [messageQuery, setMessageQuery] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    if(id) {
      socketJS.emit("join_room", id, (result) => {
        if (!result?.ok) console.warn("Chat room could not be joined.");
      });
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
    {showChat ?
    <section className={`chat-window w-full md:w-4/6 ${isMobile?'h-8/9':'h-1/2'} md:h-full flex flex-col bg-slate-800`}>
      
      {/*Chat Header*/}
      <div className="chat-heading h-16 flex items-center justify-between px-4 border-b border-slate-700 bg-slate-800 z-10">
        <div className="conversation-identity">
          <div className="conversation-avatar">{username ? username[0] : "?"}</div>
          <div className="conversation-title"><h2>{username}</h2><span>Private conversation</span></div>
        </div>
        <div className="conversation-actions">
          <button type="button" className={`conversation-action ${searchOpen ? 'is-active' : ''}`} aria-label="Search messages" aria-pressed={searchOpen} onClick={() => setSearchOpen((open) => !open)}><FaSearch /></button>
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

      {searchOpen && <div className="message-search-bar"><FaSearch /><input autoFocus type="search" placeholder="Find a word in this conversation" value={messageQuery} onChange={(event) => setMessageQuery(event.target.value)} /><button type="button" onClick={() => { setMessageQuery(""); setSearchOpen(false); }}>Done</button></div>}

      {/*Chat Messages*/}
      <div className="message-scroll flex-1 overflow-y-auto p-4 custom-scrollbar">
        <LoadChat chatId={id} query={messageQuery} />
      </div>

      {/*Message Input*/}
      <div className="composer-wrap h-16 bg-slate-900 flex items-center px-4 border-t border-slate-700 overflow-hidden">
        <MessageInput />
      </div>
    </section> : <section className="chat-window empty-conversation w-full md:w-4/6 h-full">
      <div className="empty-conversation-card">
        <div className="empty-conversation-icon"><FaComments /></div>
        <p className="empty-eyebrow">YOUR SPACE TO CONNECT</p>
        <h2>Good conversations<br />start with <span>hello.</span></h2>
        <p>Choose a conversation from the sidebar, or find a friend to start something new.</p>
        <div className="empty-hint"><span className="empty-hint-dot" /> Messages are just between you and your friends</div>
      </div>
    </section>
    }
    </>
  );
}

export default ChatWindow;
