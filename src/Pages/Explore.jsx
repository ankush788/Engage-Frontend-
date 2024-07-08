import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import "../components/App.css";

import Header from "../components/Header/Header";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import SidePanel from "../components/SidePanel/SidePanel";
import Section from "../components/Section/Section.jsx";
import Trending from "../components/Trending/Trending.jsx";
import { UserContext } from "../Context/UserContext";
import DarkModeToggle from "../components/DarkModeButton/DarkModeButton.jsx";

export default function Explore(props) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
  const { DarkMode, setDarkMode } = useContext(UserContext);

  let sections = ["For you", "Trending"];

  return (
    <div
      className={`d-flex main-container ${
        DarkMode === true ? "darkMode darkMode-noBorder" : ""
      }`}
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
        {/* <Header heading="Explore" subHeading="" /> */}
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="position-relative w-100 px-2">
            <Searchbar
              currentActiveAccountIdx={props.currentActiveAccountIdx}
              user={props.user}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {!isMobile && (
          <Section
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            sections={sections}
            activeIndex={0}
          />
        )}
        {!isMobile && <Trending />}
        {isMobile && (
          <Section
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            sections={["Who to follow"]}
            activeIndex={0}
          />
        )}
        {isMobile && (
          <SidePanel
            classNames="mt-2"
            user={props.user}
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            requestId={0}
            heading=" "
            style={{
              backgroundColor: "white",
              borderRadius: "0",
              boxShadow: "none",
            }}
          />
        )}

        {isMobile && (
          <MobileNavbar
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            setCurrentActiveAccountIdx={props.setCurrentActiveAccountIdx}
            user={props.user}
            setUser={props.setUser}
            parentUser={props.parentUser}
          />
        )}
      </div>

      <div className={"d-inline-flex flex-column side-panel-container"}>
        {isDesktop && (
          <div className="sticky-top">
            <SidePanel
              currentActiveAccountIdx={props.currentActiveAccountIdx}
              classNames="mt-2"
              user={props.user}
            />
          </div>
        )}
      </div>
      <DarkModeToggle />
    </div>
  );
}
