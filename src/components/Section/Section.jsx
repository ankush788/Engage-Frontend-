import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./SectionStyles.css";
import { UserContext } from "../../Context/UserContext";

export default function Section(props) {
  const [activeIndex, setActiveIndex] = useState(props.activeIndex);
  
  const { DarkMode, setDarkMode } = useContext(UserContext);
  const handleChildClick = (index) => {
    setActiveIndex(index); 
  };

  return (
    <div
      className={`d-flex justify-content-around bd-highlight ${DarkMode === true ? "darkMode" : ""}`}
      id="Section"
    >
      {props.sections.map((section, index) => {
        return (
          <Link
            to={
              section === "Followers"
                ? `/u/${props.currentActiveAccountIdx}/profile/${props.user.username}/followers`
                : section === "Following"
                  ? `/u/${props.currentActiveAccountIdx}/profile/${props.user.username}/following`
                  : "#"
            }
            key={index}
            className={`SectionLinks py-2 flex-md-fill bd-highlight ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleChildClick(index)}
          >
            {section}
          </Link>
        );
      })}
    </div>
  );
}
