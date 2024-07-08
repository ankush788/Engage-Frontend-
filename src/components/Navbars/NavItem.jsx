import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NavItems(props) {
  const navItemStyle = {
    padding: "1rem",
    ...props.style,
  };

  return (
    <Link to={props.link}>
      <li className="nav-item">
        <div className="nav-link" style={navItemStyle}>
          <FontAwesomeIcon
            icon={props.iconName}
            color={props.iconColor}
            size={props.iconSize}
          />
        </div>
      </li>
    </Link>
  );
}
