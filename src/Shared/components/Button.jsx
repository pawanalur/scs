import "./Button.css";

function Button({
  label = "Click Me",
  onClick = () => console.log(`${label} was pressed!`),
  className = "",
  styleVariant = "brown", // "brown" | "red" | "green"
  disabled = false,
}) {
  const handleMouseDown = (e) => {
    e.currentTarget.classList.add("pressed");
  };

  const handleMouseUp = (e) => {
    e.currentTarget.classList.remove("pressed");
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove("pressed");
  };

  const variantColors = {
    brown: "bg-[#d4a574] hover:bg-[#ddb892]",
    red: "bg-[#d96666] hover:bg-[#e37f7f]",
    green: "bg-[#69a96f] hover:bg-[#7dc184]",
  };

  const disabledClasses =
    "opacity-50 cursor-not-allowed hover:none shadow-none";

  return (
    <button
      disabled={disabled}
      onClick={(e) => !disabled && onClick(e)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`custom-button font-bold text-[16px] tracking-[0.5px] text-[#2d1810]  
        rounded-lg  transition-all duration-100 ease-in-out font-sans px-8 py-3 shadow-button  active:translate-y-[2px] 
        ${variantColors[styleVariant]}
        ${disabled ? disabledClasses : "cursor-pointer"}
        ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
