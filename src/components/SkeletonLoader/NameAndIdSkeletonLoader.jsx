import React,{useContext} from "react";
import { UserContext } from "../../Context/UserContext";
import "./NameAndIdSkeletonLoader.css";

const NameAndIdSkeletonLoader = ({
  widthName,
  widthId,
  heightName,
  heightId,
  animationDelayName,
  animationDelayId,
  customStyles
}) => {
  const { DarkMode } = useContext(UserContext);
  return (
    <div className="skeleton-name-id" style={customStyles}>
      <div
        className={`skeleton-name skeleton-animation ${
          DarkMode ? "darkMode-skeltonChanges" : ""
        }`}
        style={{
          width: widthName,
          height: heightName,
          animationDelay: animationDelayName,
        }}
      ></div>
      <div
        className={`skeleton-id skeleton-animation ${
          DarkMode ? "darkMode-skeltonChanges" : ""
        }`}
        style={{
          width: widthId,
          height: heightId,
          animationDelay: animationDelayId,
        }}
      ></div>
    </div>
  );
};

NameAndIdSkeletonLoader.defaultProps = {
  widthName: "45%",
  heightName: "15px",
  widthId: "35%",
  heightId: "10px",
  animationDelayName: "0ms",
  animationDelayId: "100ms",
};

export default NameAndIdSkeletonLoader;
