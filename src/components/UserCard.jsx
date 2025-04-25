function UserCard({ name, type = "default", onActionClick }) {

  const getButtonLabel = () => {
    switch (type) {
      case "send":
        return "Add Friend";
      case "accept":
        return "Confirm";
      case "friends":
        return "Friends";
      default:
        return null;
    }
  };
  const label = getButtonLabel();
  return (
    <div className="flex items-center justify-between gap-3 px-2 py-0 rounded-lg hover:bg-slate-700 transition duration-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5856d6] text-white font-semibold text-lg">
          {name[0]}
        </div>
        <span className="text-white text-base font-medium">{name}</span>
      </div>

      {label && (
        <button
          onClick={onActionClick}
          className={`px-2 py-1 text-sm rounded-md font-medium cursor-pointer
            ${
              type === "send"
                ? "bg-blue-600 hover:bg-blue-700"
                : type === "accept"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 cursor-default"
            }
            text-white transition duration-150`}
          disabled={type === "friends"}
        >
          {label}
        </button>
      )}
    </div>
  );
}

export default UserCard;
