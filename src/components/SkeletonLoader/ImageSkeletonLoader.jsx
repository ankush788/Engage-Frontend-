import React, { useContext } from "react";
import "./ImageSkeletonLoader.css";
import { UserContext } from "../../Context/UserContext";

const ImageSkeletonLoader = ({ width, height, animationDelay, customStyles }) => {
const {DarkMode }  = useContext(UserContext);

  return (
    <div
      className={`skeleton-image skeleton-animation ${DarkMode ? "darkMode-skeltonChanges" :""}`}
      style={{ width, height, animationDelay, ...customStyles }}
    ></div>
  );
};

ImageSkeletonLoader.defaultProps = {
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  animationDelay: "0ms",
};

export default ImageSkeletonLoader;
