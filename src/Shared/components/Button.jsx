import { twMerge } from "tailwind-merge";
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
    brown: "bg-[#d4a574] hover:bg-[#ddb892] text-[#2d1810]",
    red: "bg-[#d96666] hover:bg-[#e37f7f] text-white",
    green: "bg-[#69a96f] hover:bg-[#7dc184] text-black",
    black: "bg-[#333333] hover:bg-[#4d4d4d] text-white",
  };

  const disabledClasses =
    "opacity-50 cursor-not-allowed hover:none shadow-none";

  const cssClasses =
    twMerge(`custom-button font-bold text-[16px] tracking-[0.5px]  flex items-center justify-center
        rounded-lg  transition-all duration-100 ease-in-out font-sans px-8 py-3 shadow-button  active:translate-y-0.5 
        ${variantColors[styleVariant]}
        ${disabled ? disabledClasses : "cursor-pointer"}
        ${className}`);

  return (
    <button
      disabled={disabled}
      onClick={(e) => !disabled && onClick(e)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={cssClasses}
    >
      {label}
    </button>
  );
}

export default Button;
