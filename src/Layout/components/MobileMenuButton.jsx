import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

import Button from "../../Shared/components/Button";
import {
  SLEEP_TYPE,
  EAT_TYPE,
  EXERCISE_TYPE,
} from "../../Shared/components/constants/ActionTypeConstants";

function MobileMenuButton(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <Button
            className={buttonClasses}
            label="Sleep"
            styleVariant="black"
            onClick={() =>
              navigate("/home", { state: { actionType: SLEEP_TYPE } })
            }
          />
          <Button
            className={buttonClasses}
            label="Eat"
            styleVariant="black"
            onClick={() =>
              navigate("/home", { state: { actionType: EAT_TYPE } })
            }
          />
          <Button
            className={buttonClasses}
            label="Exercise"
            styleVariant="black"
            onClick={() =>
              navigate("/home", { state: { actionType: EXERCISE_TYPE } })
            }
          />
        </div>
        <div className="border-t-4 border-gray-300 my-2 mt-3"></div>
        <p className="py-1 text-gray-700 font-bold"> View Log</p>
        <div className="flex flex-col gap-3 items-center">
          <Button
            className={buttonClasses}
            label="All"
            styleVariant="green"
            onClick={() => navigate("/home/log")}
          />
          <Button
            className={buttonClasses}
            label="Mental"
            styleVariant="green"
            onClick={() => navigate("/home/mental-log")}
          />
          <Button
            className={buttonClasses}
            label="Physical"
            styleVariant="green"
            onClick={() => navigate("/home/physical-log")}
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
