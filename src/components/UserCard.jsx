import { FaComments } from "react-icons/fa";
import Button from "./Button";
import IconButton from "./IconButton";

function UserCard({ name, type = "default", onActionClick }) {
  const getStatusContent = () => {
    switch (type) {
      case "send":
        return (
          <Button onClick={onActionClick}>
            Add Friend
          </Button>
        );
      case "request-sent":
        return (
          <div className="flex items-center gap-2 text-green-400 font-medium text-xs">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Request Sent
          </div>
        );
      case "accept":
        return (
          <Button onClick={onActionClick}>
            Accept
          </Button>
        );
      case "request-accepted":
        return (
          <div className="flex items-center gap-2 text-green-400 font-medium text-xs">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Request Accepted
          </div>
        );
      case "friends":
        return (
          <div className="text-center"> 
            <IconButton 
              icon={<FaComments />}
              tooltip={""}
              active={""}
              onClick={()=>{}}
            />
            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 px-2 py-2 hover:bg-slate-700 transition duration-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5856d6] text-white font-semibold text-lg">
          {name[0]}
        </div>
        <span className="text-white text-base font-medium">{name}</span>
      </div>
      {getStatusContent()}
    </div>
  );
}

export default UserCard;
