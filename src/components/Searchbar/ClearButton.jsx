import react from "react";
import "./ClearButton.css";

export default function ClearButton(props) {
  return (
    <button
      className={"clearButton " + props.customClasses}
      style={props.customStyles}
      onClick={props.onClick}
    >
      <svg viewBox="0 0 15 15" style={{ fill: "white" }}>
        <g>
          <path d="M6.09 7.5L.04 1.46 1.46.04 7.5 6.09 13.54.04l1.42 1.42L8.91 7.5l6.05 6.04-1.42 1.42L7.5 8.91l-6.04 6.05-1.42-1.42L6.09 7.5z"></path>
        </g>
      </svg>
    </button>
  );
}
