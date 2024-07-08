import BASE_URL from "../apiConfig";
import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../components/App.css";

import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import Tweet from "../components/Feed/Tweet";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header.jsx";
import ProfileBox from "../components/ProfileBox/ProfileBox";
import { TweetSkeletonLoader } from "../components/SkeletonLoader";
import { UserContext } from "../Context/UserContext.js";
import DarkModeToggle from "../components/DarkModeButton/DarkModeButton.jsx";

const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default function Profile(props) {
  const location = useLocation();
  const { customUser } = location.state || {};

  const isCustomUser =
    customUser &&
    !isEmptyObject(customUser) &&
    customUser.username !== props.user.username;
  const user = isCustomUser ? customUser : props.user;

  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

  const [deleteTweet, setDeleteTweet] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState(null);
  const [followUpdated, setFollowUpdated] = useState(false);
  const { DarkMode, setDarkMode } = useContext(UserContext);

  useEffect(() => {
    const getTweets = () => {
      axios
        .get(`${BASE_URL}/tweet/gettweets`, {
          withCredentials: true,
          params: { all: false, customUser: isCustomUser && user.username },
        })
        .then((res) => {
          if (res.status === 200) {
            setTweets(res.data.tweets.reverse());
          }

          setIsLoading(false);
          setDeleteTweet(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTweets();
  }, [deleteTweet, user]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className={`d-flex main-container ${
        DarkMode === true ? "darkMode  darkMode-noBorder" : ""
      }`}
      id="profile"
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
        <Header
          heading={user.name}
          subHeading={
            tweets &&
            (tweets.length !== 1 ? tweets.length + " Posts" : "1 Post")
          }
          style={{ height: "75px" }}
        />
        <ProfileBox
          currentActiveAccountIdx={props.currentActiveAccountIdx}
          user={user}
          isCustomUser={isCustomUser}
          customUser={customUser}
          setUser={props.setUser}
          followUpdated={followUpdated}
        />
        <Header
          currentActiveAccountIdx={props.currentActiveAccountIdx}
          heading={isCustomUser ? "Posts" : "Your posts"}
          style={{ height: "75px" }}
        />

        {isLoading
          ? [...Array(6)].map((_, index) => <TweetSkeletonLoader key={index} />)
          : tweets.map((tweet, index) => {
              let liked = tweet.likedBy.filter((likedBy) => {
                return likedBy === user.username;
              });
              return (
                <Tweet
                  currentActiveAccountIdx={props.currentActiveAccountIdx}
                  key={index}
                  tweet={tweet}
                  liked={liked.length}
                  user={user}
                  setDeleteTweet={setDeleteTweet}
                />
              );
            })}
        {isMobile && (
          <MobileNavbar
            parentUser={props.parentUser}
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            setCurrentActiveAccountIdx={props.setCurrentActiveAccountIdx}
            user={props.user}
            setUser={props.setUser}
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
              followUpdated={followUpdated}
              setFollowUpdated={setFollowUpdated}
            />
            <SidePanel
              currentActiveAccountIdx={props.currentActiveAccountIdx}
              user={props.user}
              setUser={props.setUser}
              followUpdated={followUpdated}
              setFollowUpdated={setFollowUpdated}
            />
          </div>
        )}
      </div>
      <DarkModeToggle />
    </div>
  );
}
