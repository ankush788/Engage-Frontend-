import react, { useState, useContext } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import SidePanel from "../SidePanel/SidePanel";
import SidePanelItem from "../SidePanel/SidePanelItem";
import ClearButton from "./ClearButton";
import { getUsers } from "../../Utils/utils";
import { SidePanelItemSkeletonLoader } from "../SkeletonLoader/index.js";
import { UserContext } from "../../Context/UserContext";

export default function Searchbar(props) {
  const [input, setInput] = useState("");
  const [usersToMap, setUsersToMap] = useState(undefined);
  const [followUpdated, setFollowUpdated] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const { DarkMode, setDarkMode } = useContext(UserContext);
  const handleChange = (value) => {
    setInput(value);
    setUsersToMap(undefined);
    getUsers("search", "search", setUsersToMap, setUpdatedUser, value);
  };

  const handleClear = () => {
    setInput("");
    setUsersToMap(undefined);
  };

  return (
    <div className="searchbar-container">
      <div
        className={
          "d-inline-flex align-items-center mt-2 searchbar " +
          props.className +
          `${" "}` +
          `${DarkMode === true ? "darkMode hovering-class" : ""}`
        }
        style={props.style}
      >
        <SearchIcon
          className="searchIcon align-items-center ms-2 me-3 "
          fontSize="medium"
          sx={{ color: "rgb(83, 100, 113)" }}
        />
        <input
          className="d-flex bgc-white"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search users"
        />
        {input && <ClearButton onClick={handleClear} />}
      </div>
      <div className="search-box-container d-none justify-content-center">
        <div className={`search-box bgc-white box-shadow ${DarkMode === true ? "darkMode" : ""}`} style={{boxShadow: "0 0 3px 0 #00000022"}}>
          {usersToMap && usersToMap.length ? (
            <div className="search-box-heading">Search for "{input}"</div>
          ) : (
            <>
              <div className="search-box-heading">
                Try searching for people...
              </div>
              {input === "" && (
                <ul className="list-group">
                  <li></li>
                  <li></li>
                </ul>
              )}
            </>
          )}
          <ul className="list-group">
            {input !== "" && usersToMap === undefined
              ? [...Array(3)].map((_, index) => (
                  <SidePanelItemSkeletonLoader key={index} />
                ))
              : usersToMap &&
                usersToMap.map((userToMap, index) => {
                  return (
                    <SidePanelItem
                      currentActiveAccountIdx={props.currentActiveAccountIdx}
                      key={index}
                      user={updatedUser || props.user}
                      followUpdated={followUpdated}
                      setFollowUpdated={setFollowUpdated}
                      userToMap={userToMap}
                      followPage={false}
                    />
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}
