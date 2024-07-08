import React, { useEffect, useState, useContext } from "react";
import SidePanelItem from "./SidePanelItem";
import "./SidePanel.css";
import { SidePanelItemSkeletonLoader } from "../SkeletonLoader/index.js";
import { getUsers } from "../../Utils/utils";
import { UserContext } from "../../Context/UserContext";

export default function SidePanel(props) {
  /* (props.requestId == 0) -> followers
    (props.requestId == 1) -> following
    */

  const [usersToMap, setUsersToMap] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const { DarkMode, setDarkMode } = useContext(UserContext);

  let customItemStyle = {
    backgroundColor: "white",
    backgroundColorHover: "red",
    borderRadius: "0",
    cursor: "pointer",
  };

  useEffect(() => {
    if (props.path === "followers" || props.path === "following") {
      getUsers("current", props.path, setUsersToMap, setUpdatedUser, "");
    } else {
      getUsers("random", props.path, setUsersToMap, setUpdatedUser, "");
    }
  }, [props.path]);

  // if (!usersToMap){
  //     return <div> Loading... </div>;
  // }

  return (
    <div
      className={
        `d-inline-flex bgc-white side-panel box-shadow ${
          DarkMode === true ? "darkMode" : ""
        }` + props.classNames
      }
      style={props.style}
    >
      <ul className={`list-group overflow-hidden `}>
        {props.heading || <h5 className="ms-1 p-4 pb-2"> Who to follow </h5>}

        {!usersToMap
          ? [...Array(4)].map((_, index) => (
              <SidePanelItemSkeletonLoader key={index} />
            ))
          : usersToMap.map((userToMap, index) => {
              return (
                <SidePanelItem
                  currentActiveAccountIdx={props.currentActiveAccountIdx}
                  key={index}
                  user={updatedUser || props.user}
                  followUpdated={props.followUpdated}
                  setFollowUpdated={props.setFollowUpdated}
                  userToMap={userToMap}
                  followPage={props.followPage}
                  style={
                    props.requestId === 0 || props.requestId === 1
                      ? customItemStyle
                      : {}
                  }
                />
              );
            })}
      </ul>
    </div>
  );
}
