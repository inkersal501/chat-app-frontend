import { useSelector } from "react-redux";
import { logout, selectUser } from "../redux/authSlice";
import Logo from "./Logo";
import { useState, useRef, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { resetDefault } from "../redux/chatSlice";
import { socketJS, userJS } from "../js";

function TopBar() {
  const user = useSelector(selectUser);
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = async () => {
    await userJS.logout();
    socketJS.disconnect();
    dispatch(logout());
    dispatch(resetDefault());
    toast.success("Logged Out successfully.");
    navigate("/");
  };

  return (
    <header className="app-topbar py-2 px-4 bg-slate-800 border-b border-slate-600 flex justify-between items-center text-white">

      <div className="flex items-center space-x-3">
        <Logo width="10" />
        <h1 className="text-xl font-semibold m-0">convo<span>.</span></h1>
      </div>

      <div className="profile-menu relative" ref={dropdownRef}>
        <button
          type="button"
          className="profile-trigger flex items-center space-x-3 cursor-pointer hover:bg-slate-700 px-2 py-1 rounded-lg transition"
          aria-expanded={showLogout}
          onClick={() => setShowLogout(!showLogout)}
        >
          <span className="text-sm">Hello, {user.username}</span>
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900
            bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase"
          >
            {user.username[0] ? user.username[0] : ""}
          </div>
        </button>

        {showLogout && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-slate-700 border border-slate-600 z-50">
            <ul className="py-2 text-sm text-gray-200">
              <li>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-600 hover:text-white transition cursor-pointer"
                  onClick={handleLogout}
                >
                 <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
