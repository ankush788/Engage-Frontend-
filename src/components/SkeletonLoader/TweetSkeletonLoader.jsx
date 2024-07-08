import React, { useContext } from "react";
import "../Feed/Tweet.css";
import "./TweetSkeletonLoader.css";
import ImageSkeletonLoader from "./ImageSkeletonLoader";
import NameAndIdSkeletonLoader from "./NameAndIdSkeletonLoader";
import ButtonSkeletonLoader from "./ButtonSkeletonLoader";
import { UserContext } from "../../Context/UserContext";

const TweetSkeletonLoader = () => {
  const {DarkMode }  = useContext(UserContext);
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="me-3">
              <ImageSkeletonLoader />
            </div>

            <div className="d-flex flex-column" style={{ width: "100%" }}>
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex w-100">
                    <NameAndIdSkeletonLoader />
                  </div>
                </div>

                <p className="card-text my-3">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className={`skeleton-tweet-content-line skeleton-animation ${DarkMode ? "darkMode-skeltonChanges" :""}`}></div>
                  ))}
                </p>
              </div>
              <div className="d-flex">
                <div className="skeleton-tweet-actions">
                  <div className={`skeleton-action skeleton-animation ms-1 ${DarkMode ? "darkMode-skeltonChanges" :""}`}></div>
                  <div className={`skeleton-action skeleton-animation ms-5 ${DarkMode ? "darkMode-skeltonChanges" :""}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetSkeletonLoader;
