import React, { useContext } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./TrendingStyles.css";
import { UserContext } from "../../Context/UserContext";

export default function Trending() {
  const { DarkMode, setDarkMode } = useContext(UserContext);
  return (
    <div
      id="Trending"
      className={`py-2 px-2 ${DarkMode === true ? "darkMode trending-changes" : ""}`}
    >
      {/* <p className="Heading">1.Tiger</p>
      <div className="Hastag-div">
        <p className="Hastag">#Trending</p>
        <button className="Setting">...</button>
      </div>
      <p className="Posts">7500 Posts</p> */}
    </div>
  );
}
