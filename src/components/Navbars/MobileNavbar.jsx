import BASE_URL from "../../apiConfig";
import React, { useState } from "react";
import NavItem from "./NavItem";
import "./MobileNavbar.css";
import ProfileImage from "../ProfileImage";
import { faHouse, faHashtag, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ImageSkeletonLoader,
  NameAndIdSkeletonLoader,
} from "../SkeletonLoader";

export default function MobileNavbar(props) {
  const navigate = useNavigate();
  const [updatingUser, setUpdatingUser] = useState(false);

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

  function handleLogout() {
    axios
      .post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        props.setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="fixed-bottom mobile-navbar">
      <ul className="nav justify-content-between align-items-center mx-4">
        <div className="mobile-navbar-nav-item">
          {updatingUser ? (
            <ImageSkeletonLoader width={28} height={28} />
          ) : (
            <NavItem
              link={`/u/${props.currentActiveAccountIdx}/home`}
              iconName={faHouse}
              iconColor={"black"}
              iconSize={"l"}
            />
          )}
        </div>
        <div className="mobile-navbar-nav-item">
          {updatingUser ? (
            <ImageSkeletonLoader width={28} height={28} />
          ) : (
            <NavItem
              link={`/u/${props.currentActiveAccountIdx}/explore`}
              iconName={faHashtag}
              iconColor={"black"}
              iconSize={"l"}
            />
          )}
        </div>
        <div className="mobile-navbar-nav-item">
          {updatingUser ? (
            <ImageSkeletonLoader width={28} height={28} />
          ) : (
            <NavItem
              link={`/u/${props.currentActiveAccountIdx}/profile`}
              iconName={faUser}
              iconColor={"black"}
              iconSize={"l"}
            />
          )}
        </div>

        <div className="dropdown border-top">
          <div
            className="d-flex align-items-center justify-content-center p-3 link-body-emphasis dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {!props.user || updatingUser ? (
              <ImageSkeletonLoader width={28} height={28} />
            ) : (
              <ProfileImage width={28} height={28} user={props.user} />
            )}
          </div>

          <ul className="dropdown-menu text-small shadow">
            {!props.parentUser ? (
              <div className="d-flex">
                <ImageSkeletonLoader width={28} height={28} />
                <NameAndIdSkeletonLoader />
              </div>
            ) : (
              props.parentUser.activeAccounts.map((activeAccount, idx) => {
                return (
                  <li
                    className="dropdown-item d-flex"
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

        {/* <div className="dropdown">
          <div
            href="#"
            className="d-flex align-items-center justify-content-center link-body-emphasis dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <ProfileImage width={28} height={28} user={props.user} />
            <ul className="dropdown-menu text-small shadow">
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </ul>
    </div>
  );
}
