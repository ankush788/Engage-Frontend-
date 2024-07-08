import BASE_URL from "../../apiConfig";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import NameAndId from "./NameAndId";
import EditProfileButton from "../Buttons/EditProfileButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ProfileImage from "../ProfileImage";
import "./ProfileBox.css";
import axios from "axios";
import { ProfileBoxSkeletonLoader } from "../SkeletonLoader/index.js";
import { UserContext } from "../../Context/UserContext";
const getUpdatedUser = (updatedUser) => {
  axios
    .get(`${BASE_URL}/user/getuser`, { withCredentials: true })
    .then((res) => {
      updatedUser(res.data.currentActiveUser);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function ProfileBox(props) {
  const [updatedUser, setUpdatedUser] = useState(null);
  const { DarkMode, setDarkMode } = useContext(UserContext);
  useEffect(() => {
    getUpdatedUser(setUpdatedUser);
  }, [props.followUpdated]);

  // if (!updatedUser){
  //   return <div> Loading... </div>;
  // }

  return !updatedUser ? (
    <ProfileBoxSkeletonLoader />
  ) : (
    <div>
      {/* Cover Image */}
      <div
        className={`profile-box-bg  ${
          DarkMode === true ? "darkMode profileBox-darkMode" : ""
        }`}
      >
        <img src=""></img> {/* alt="cover_photo" */}
      </div>

      <div
        className={`profile-box  ${
          DarkMode === true ? "darkMode profileBox-darkMode" : ""
        } `}
      >
        <div className="d-flex align-items-center justify-content-center profile-img-container">
          <ProfileImage user={props.user} width={133} height={133} />
        </div>

        <div className="d-flex my-4 justify-content-end">
          {/* <EditProfileButton /> */}
        </div>

        <NameAndId user={props.user} profileBox={true} />

        {/* Information */}
        <div className="profile-box-info">
          <p>
            <CalendarMonthIcon
              sx={{ fontSize: "16px" }}
              style={{ verticalAlign: "center" }}
            />{" "}
            Joined {props.user.joined}{" "}
          </p>
          {!props.isCustomUser && (
            <p>
              <Link to={`${props.user.username}/following`}>
                <strong>{updatedUser.follows.length} </strong> Following
              </Link>
              &nbsp;&nbsp;
              <Link to={`${props.user.username}/followers`}>
                <strong>{updatedUser.followedBy.length} </strong> Followers
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
