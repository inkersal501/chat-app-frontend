const IconButton = ({ icon, active, onClick }) => (
    <button
      className={`text-xl p-3 rounded-lg cursor-pointer hover:bg-slate-700 ${active ? 'bg-slate-700' : ''}`}
      onClick={onClick}
    >
        {icon}
    </button>
);
export default IconButton;