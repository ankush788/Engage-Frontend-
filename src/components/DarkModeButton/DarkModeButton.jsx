// DarkModeToggle.js
import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import black from "./black.svg";
import white from "./white.svg";
import "./DarkModeButton.css";

const DarkModeToggle = () => {
  const { DarkMode, setDarkMode } = useContext(UserContext);
  const [rotate, setRotate] = useState(false);

  const toggleDarkMode = () => {
    setRotate(true);
    setTimeout(() => {
      setDarkMode(!DarkMode);
      setRotate(false);
    }, 300); // delay for rotation
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`dark-mode-toggle ${DarkMode ? "dark" : "light"}`}
      aria-label="Toggle dark mode"
      style={{ transform: rotate ? "rotate(360deg)" : "rotate(0deg)" }}
    >
      {DarkMode ? (
        <img className="sun-icon" src={black} alt="" />
      ) : (
        <img className="sun-icon" src={white} alt="" />
      )}
    </button>
  );
};

export default DarkModeToggle;
