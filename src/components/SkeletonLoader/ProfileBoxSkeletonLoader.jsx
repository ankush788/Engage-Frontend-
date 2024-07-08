import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
// import "./ProfileBoxSkeletonLoader.css";
import "../ProfileBox/ProfileBox.css";
import { ImageSkeletonLoader, NameAndIdSkeletonLoader } from "./index.js";

const ProfileBoxSkeletonLoader = () => {
  const { DarkMode } = useContext(UserContext);
  return (
    <div>
      <div className="profile-box-bg"></div>

      <div className={"profile-box"}>
        <div className="d-flex align-items-center justify-content-center profile-img-container">
          <ImageSkeletonLoader width={141} height={141} />
        </div>

        <div className="d-flex my-4 justify-content-end">
          {/* <EditProfileButton /> */}
        </div>

        <NameAndIdSkeletonLoader />
        <div className="my-4"></div>
        <NameAndIdSkeletonLoader />
        <div className="my-4"></div>
      </div>
    </div>
  );
};

export default ProfileBoxSkeletonLoader;
