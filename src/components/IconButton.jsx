import CustomTooltip from "./CustomTooltip";

const IconButton = ({ icon, tooltip = "", active, onClick, position = "top" }) => {
  const buttonElement = (
    <button
      type="button"
      aria-label={tooltip || undefined}
      aria-pressed={typeof active === "boolean" ? active : undefined}
      className={`text-xl p-3 rounded-full cursor-pointer hover:bg-slate-700 ${active ? 'bg-slate-700' : ''}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );

  return tooltip !== "" ? (
    <CustomTooltip tooltip={tooltip} position={position}>
      {buttonElement}
    </CustomTooltip>
  ) : (
    buttonElement
  );
};

export default IconButton;
