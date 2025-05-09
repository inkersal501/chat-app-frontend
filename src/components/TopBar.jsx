import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
 
function TopBar() {

  const user = useSelector(selectUser);

  return (
    <div className="py-2 px-4 bg-slate-800 border-b border-slate-600 flex justify-between items-center text-white">
      <h1 className="text-xl font-semibold">Chat App</h1>
      <div className="flex items-center space-x-3">
        <span className="text-sm">Hello, {user.username}</span>        
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-900
        bg-gradient-to-r from-gray-200 via-slate-100 to-gray-300 font-semibold text-lg uppercase">
          {user.username[0]?user.username[0]:""}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
