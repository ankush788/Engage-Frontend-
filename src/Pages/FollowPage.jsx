import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "../components/App.css";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header";
import Section from "../components/Section/Section";
import { UserContext } from "../Context/UserContext";
import DarkModeToggle from "../components/DarkModeButton/DarkModeButton";

export default function FollowPage(props) {
  const { DarkMode, setDarkMode } = useContext(UserContext);
  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

  const { path } = useParams();
  const sections = ["Followers", "Following"];
  let requestId = path === "followers" ? 0 : 1;
  /* (props.requestId == 0) -> followers
    (props.requestId == 1) -> following
    (props.requestId == 2) -> search
    */

  return (
    <div
      className={`d-flex main-container ${
        DarkMode ? "darkMode  darkMode-noBorder" : ""
      } `}
      id="followPage"
    >
      <div className="d-inline-flex">
        {(isTablet || isDesktop) && (
          <Sidebar
            parentUser={props.parentUser}
            setParentUser={props.setParentUser}
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            setCurrentActiveAccountIdx={props.setCurrentActiveAccountIdx}
            user={props.user}
            setUser={props.setUser}
          />
        )}
      </div>

      <div className="d-inline-flex flex-column feed">
        {(isTablet || isDesktop) && (
          <Header
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            heading={props.user.name}
            subHeading={props.user.username}
            style={{ height: "72px", position: "relative" }}
          />
        )}
        <Section
          currentActiveAccountIdx={props.currentActiveAccountIdx}
          sections={sections}
          user={props.user}
          activeIndex={requestId}
        />

        <div
          style={{
            margin: "6px 0",
            borderRadius: "16px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <SidePanel
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            path={path}
            requestId={requestId}
            user={props.user}
            heading=" "
            followPage={true}
            style={{
              backgroundColor: "white",
              boxShadow: "none",
            }}
          />
        </div>

        {isMobile && (
          <MobileNavbar
            setUser={props.setUser}
            setCurrentActiveAccountIdx={props.setCurrentActiveAccountIdx}
            parentUser={props.parentUser}
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            user={props.user}
          />
        )}
      </div>

      <div className={"d-inline-flex flex-column side-panel-container"}>
        {isDesktop && (
          <div className="sticky-top">
            <Searchbar
              currentActiveAccountIdx={props.currentActiveAccountIdx}
              user={props.user}
              style={{ width: "100%" }}
            />
            <SidePanel
              currentActiveAccountIdx={props.currentActiveAccountIdx}
              user={props.user}
            />
          </div>
        )}
      </div>
      <DarkModeToggle />
    </div>
  );
}
