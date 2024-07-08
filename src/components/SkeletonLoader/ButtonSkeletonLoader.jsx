import React, { useContext } from "react";
import "./ButtonSkeletonLoader.css";
import { UserContext } from "../../Context/UserContext";

const ButtonSkeletonLoader = ({ height, width, borderRadius }) => {
  const { DarkMode } = useContext(UserContext);
  return (
    <div
      className={`skeleton-button skeleton-animation ${
        DarkMode === true ? "darkMode-skeltonChanges" : ""
      }`}
      style={{ height, width, borderRadius }}
    ></div>
  );
};

ButtonSkeletonLoader.defaultProps = {
  borderRadius: "40px",
  height: "30px",
  width: "66px",
};

export default ButtonSkeletonLoader;
