import { useState } from "react";
import ReactDOM from "react-dom";

import Button from "../../Shared/components/Button";

function MobileMenuButton(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonClasses = "py-0 h-5 w-[90%]";
  const menuScreen = (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-10 transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-24 right-4 mt-2 w-40 bg-white rounded-md shadow-md p-3 text-sm z-10  transform transition-all duration-500 ease-out
          ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
      >
        <p className="py-1 text-gray-700 font-bold"> User Actions</p>
        <div className="flex flex-col gap-3 items-center">
          <Button className={buttonClasses} label="M1" styleVariant="black" />
          <Button className={buttonClasses} label="P1" styleVariant="black" />
          <Button className={buttonClasses} label="P2" styleVariant="black" />
        </div>
        <div className="border-t-4 border-gray-300 my-2 mt-3"></div>
        <p className="py-1 text-gray-700 font-bold"> View Log</p>
        <div className="flex flex-col gap-3 items-center">
          <Button
            className={buttonClasses}
            label="Mental"
            styleVariant="green"
          />
          <Button
            className={buttonClasses}
            label="Physical"
            styleVariant="green"
          />
        </div>
      </div>
    </>
  );
  const menuContent =
    isMenuOpen &&
    ReactDOM.createPortal(menuScreen, document.getElementById("menu-hook"));

  return (
    <div className="block md:hidden relative">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="px-3 py-2 bg-brown-400 rounded-md shadow text-sm font-semibold"
      >
        Menu ▼
      </button>

      {menuContent}
    </div>
  );
}

export default MobileMenuButton;
