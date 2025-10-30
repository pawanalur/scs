import "./Button.css";

function Button({
  label = "Click Me",
  onClick = () => console.log(`${label} was pressed!`),
  className = "",
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

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`custom-button font-bold text-[16px] tracking-[0.5px] text-[#2d1810] bg-[#d4a574] 
        rounded-lg cursor-pointer transition-all duration-100 ease-in-out 
        font-sans px-8 py-3 shadow-button hover:bg-[#ddb892] active:translate-y-[2px] ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
