import BASE_URL from "../../apiConfig";
import React, { useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import NavItem from "./NavItem";
import { faHouse, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import TwitterIcon from "@mui/icons-material/Twitter";
import ProfileImage from "../ProfileImage";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ImageSkeletonLoader,
  NameAndIdSkeletonLoader,
} from "../SkeletonLoader";

export default function Sidebar(props) {
  const navigate = useNavigate();
  const [updatingUser, setUpdatingUser] = useState(false);

  const handleLogout = () => {
    axios
      .post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        props.setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddAccount = () => {
    navigate("/", { state: { addAccountRoute: true } });
  };

  const handleAccountIdxChange = (idx) => {
    setUpdatingUser(true);
    axios
      .post(
        `${BASE_URL}/user/updateCurrentActiveUser`,
        { idx: idx },
        { withCredentials: true }
      )
      .then(async (res) => {
        props.setCurrentActiveAccountIdx(idx);
        props.setUser(res.data.updatedUser);
        navigate(`/u/${idx}/home`);
      })
      .catch((err) => {
        console.log("Error in handleAccountIdxChange: ", err);
      })
      .finally(() => {
        setUpdatingUser(false);
      });
  };

  return (
    <div className="d-inline-flex flex-column align-items-end p-2 sidebar">

      {/* Icons */}
      <ul className="nav flex-column mb-auto text-center">
        {/* Main Logo */}
        <a href={`/u/${props.currentActiveAccountIdx}/home`} className="logo-link" style={{ textDecoration: "none" }}>
          {/* <TwitterIcon fontSize="large" sx={{ color: "#1da1f2" }} />
          */}
          <h3 className="HeadingText">
            <span>E&nbsp;</span>
          </h3>
        </a>
        <div className="d-flex align-items-center justify-content-center sidebar-nav-item">
          {updatingUser ? (
            <ImageSkeletonLoader customStyles={{ margin: "4px" }} />
          ) : (
            <NavItem
              link={`/u/${props.currentActiveAccountIdx}/home`}
              iconName={faHouse}
              iconColor={"#282829"}
              iconSize={"xl"}
            />
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center sidebar-nav-item">
          {updatingUser ? (
            <ImageSkeletonLoader customStyles={{ margin: "4px" }} />
          ) : (
            <NavItem
              link={`/u/${props.currentActiveAccountIdx}/explore`}
              iconName={faHashtag}
              iconColor={"#282829"}
              iconSize={"xl"}
            />
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center sidebar-nav-item">
          {updatingUser ? (
            <ImageSkeletonLoader customStyles={{ margin: "4px" }} />
          ) : (
            <NavItem
              link={`/u/${props.currentActiveAccountIdx}/profile`}
              iconName={faUser}
              iconColor={"#282829"}
              iconSize={"xl"}
            />
          )}
        </div>
      </ul>

      {/* Profile Icon */}
      <div className="dropdown">
        <div
          className="d-flex align-items-center justify-content-center p-3 link-body-emphasis dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          {!props.user || updatingUser ? (
            <ImageSkeletonLoader />
          ) : (
            <ProfileImage width={46} height={46} user={props.user} />
          )}
        </div>

        <ul className="dropdown-menu text-small">
          {!props.parentUser ? (
            <div className="d-flex">
              <ImageSkeletonLoader />
              <NameAndIdSkeletonLoader />
            </div>
          ) : (
            props.parentUser.activeAccounts.map((activeAccount, idx) => {
              return (
                <li
                  className="dropdown-item"
                  onClick={() => {
                    handleAccountIdxChange(idx);
                  }}
                  key={idx}
                >
                  <ProfileImage
                    user={activeAccount.user}
                    style={{ marginRight: "6px" }}
                  />
                  <div className="userInfo">
                    <div className="userName">{activeAccount.user.name}</div>
                    <div className="userEmail">
                      {activeAccount.user.username}
                    </div>
                  </div>
                </li>
              );
            })
          )}
          <hr />
          <li className="dropdown-item" onClick={handleAddAccount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
              style={{ marginRight: "8px" }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Add another account
          </li>
          <li>
            <a className="dropdown-item" onClick={handleLogout}>
              {!props.parentUser ? (
                <NameAndIdSkeletonLoader />
              ) : props.parentUser.activeAccounts.length <= 1 ? (
                "Sign out"
              ) : (
                "Sign out of all accounts"
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
