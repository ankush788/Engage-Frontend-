import React from "react";
import { ImageSkeletonLoader } from "./SkeletonLoader/index.js";

export default function ProfileImage(props) {
  const imageStyle = {
    width: !props.width ? "46px" : `${props.width}px`,
    height: !props.height ? "46px" : `${props.height}px`,
    borderRadius: "50%",
    ...props.style,
  };
  
  return !props.user ? (
    <div style={{ margin: "4px 14px 0 0" }}>
      {" "}
      <ImageSkeletonLoader />{" "}
    </div>
  ) : (
    <img
      className={"rounded-circle"}
      src={
        props.user.picture
          ? props.user.picture
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_lSNw7Ee7u6J7SWu5Ku6BP6H3kMcOI9TFw&usqp=CAU"
      }
      alt="img"
      style={imageStyle}
    />
  );
}
