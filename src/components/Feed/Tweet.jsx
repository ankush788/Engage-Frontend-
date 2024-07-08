import BASE_URL from "../../apiConfig";
import React, { useEffect, useState, useContext } from "react";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Comments from "./Comments";
import Header from "../Header/Header";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../Context/UserContext";
import { NameAndIdSkeletonLoader } from "../SkeletonLoader";

let TIME = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
let DATE = `${new Date().getDate()}-${
  new Date().getMonth() + 1
}-${new Date().getFullYear()}`;

const deleteTweet = (e, tweet, setDeleteTweet) => {
  e.preventDefault();

  axios
    .post(
      `${BASE_URL}/tweet/deletetweet`,
      {
        tweetId: tweet._id,
        audio: tweet.audio ? tweet.audio : null,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status == 200) {
        setDeleteTweet(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleLike = (tweet, setLikes, isComment, liked, setLiked) => {
  axios
    .post(
      `${BASE_URL}/tweet/liketweet`,
      {
        tweetId: tweet._id,
        isComment: isComment,
        likes: tweet.likes,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data.message == "Already liked") {
        setLikes(res.data.updatedLikes);
      } else {
        setLikes(res.data.updatedLikes);
      }
      setLiked(!liked);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleComment = (
  tweet,
  setClickedCommentButton,
  clickedCommentButton,
  setCommentedBy,
  isComment
) => {
  if (clickedCommentButton) {
    setClickedCommentButton(false);
    return;
  } else {
    setClickedCommentButton(true);
  }

  axios
    .post(
      `${BASE_URL}/tweet/getcomments`,
      {
        tweetId: tweet._id,
      },
      { withCredentials: true }
    )
    .then((res) => {
      setCommentedBy(res.data.commentedBy);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function Tweet(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
  const [timeStamp, setTimeStamp] = useState(null);
  const [likes, setLikes] = useState(props.tweet.likes);
  const [liked, setLiked] = useState(props.liked);
  const [comments, setComments] = useState(props.tweet.comments);
  const [clickedCommentButton, setClickedCommentButton] = useState(false);
  const [commentButtonHover, setcommentButtonHover] = useState(false);
  const [likesButtonHover, setlikesButtonHover] = useState(false);
  const [commentedBy, setCommentedBy] = useState([]);
  const [commentClicked, setCommentClicked] = useState([]);
  const { DarkMode, setDarkMode } = useContext(UserContext);

  const customStyle = {
    ...props.style,
    margin: props.threaded ? "0" : "",
    boxShadow: props.threaded ? "none" : "",
    borderBottom: props.threaded ? "none" : "",
  };

  const handleCommentButtonHover = () => {
    setcommentButtonHover(!commentButtonHover);
  };

  const handleLikesButtonHover = () => {
    setlikesButtonHover(!likesButtonHover);
  };

  let parts1 = props.tweet.date.split("-");
  let tweetDay = parseInt(parts1[0]),
    tweetMonth = parseInt(parts1[1]),
    tweetYear = parseInt(parts1[2]);
  let date = new Date(tweetYear, tweetMonth, tweetDay);

  let parts2 = props.tweet.time.split(":");
  let tweetHr = parseInt(parts2[0]),
    tweetMin = parseInt(parts2[1]),
    tweetSec = parseInt(parts2[2]);

  const updateTimeStamp = () => {
    TIME = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    DATE = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    let tweetDate = new Date(tweetYear + "-" + tweetMonth + "-" + tweetDay);
    let currDate = new Date(
      DATE.split("-")[2] + "-" + DATE.split("-")[1] + "-" + DATE.split("-")[0]
    );

    if (currDate.getTime() === tweetDate.getTime()) {
      setTimeStamp(
        Math.abs(parseInt(TIME.split(":")[0]) - parseInt(tweetHr)) + "h"
      ); // within a day
    } else {
      setTimeStamp(
        tweetDay +
          " " +
          tweetDate.toLocaleString("default", { month: "long" }).substr(0, 3)
      ); // not today
    }

    setTimeout(updateTimeStamp, 100000);
  };

  const [audioBlob, setAudioBlob] = useState(null);
  const fetchAudioData = async () => {
    try {
      if (props.tweet.audio) {
        const filename = props.tweet.audio.filename;
        const response = await axios.get(
          `${BASE_URL}/tweet/getAudio/${filename}`,
          {
            withCredentials: true,
            responseType: "arraybuffer", // Ensure the response is an arraybuffer
            timeout: 5000,
          }
        );

        if (response.status === 200) {
          const blob = new Blob([response.data], { type: "audio/webm" });
          setAudioBlob(blob);
        }
      }
    } catch (error) {
      console.error("Error fetching audio data:", error);
    }
  };

  useEffect(() => {
    fetchAudioData();
    updateTimeStamp();
  }, [props.tweet.audio]);

  // if (!timeStamp) return <div> Loading... </div>;

  return (
    <div
      className={`${
        DarkMode === true ? "darkMode tweet-darkMode-changes" : ""
      }`}
    >
      <div className="card" id="tweet" style={customStyle}>
        <div className="card-body">
          <div className="d-flex flex-column">
            <Link
              to={`/u/${props.currentActiveAccountIdx}/${
                props.tweet.username
              }/${props.tweet._id}/${props.isComment || false}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="d-flex">
                <div className="me-3">
                  <ProfileImage width={46} height={46} user={props.user} />
                  {(clickedCommentButton || props.threaded) && (
                    <div className="comment-line"></div>
                  )}
                </div>

                <div className="d-flex flex-column" style={{ width: "100%" }}>
                  <div>
                    {/* Tweet Header */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex w-100">
                        <NameAndId user={props.user} />
                        <div className="d-flex align-items-end ms-3 dateNtimeContainer">
                          <p className="dateNtime m-0">{timeStamp}</p>
                        </div>
                      </div>

                      {!isMobile && (
                        <form
                          onSubmit={(e) =>
                            deleteTweet(e, props.tweet, props.setDeleteTweet)
                          }
                          className="d-flex align-items-center me-2"
                        >
                          <div
                            className="link-body-emphasis dropdown"
                            data-bs-toggle="dropdown"
                          >
                            ...
                          </div>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                disabled={props.disableDeleteTweet}
                                className="dropdown-item"
                              >
                                {" "}
                                Delete post{" "}
                              </button>
                            </li>
                          </ul>
                        </form>
                      )}
                    </div>

                    {/* Tweet Content */}
                    <p className="card-text my-3"> {props.tweet.content} </p>
                    {props.tweet.audio &&
                      (!audioBlob ? (
                        <NameAndIdSkeletonLoader customStyles={{ margin: "10px 0 20px 0" }} />
                      ) : (
                        <audio
                          style={{
                            width: "70%",
                            height: "1.5em",
                            margin: "10px 0 20px 0",
                          }}
                          controls
                          autoplay
                          src={URL.createObjectURL(audioBlob)}
                        ></audio>
                      ))}
                    {/* Tweet Image */}
                    {/* <div className="tweet-image-bg">
                                            <img src="https://github.com/mdo.png" alt="tweet_img" className="tweet-image" />
                                        </div> */}
                  </div>
                  {/* Icons */}
                  <div className="d-flex">
                    <div
                      onMouseEnter={handleCommentButtonHover}
                      onMouseLeave={handleCommentButtonHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleComment(
                          props.tweet,
                          setClickedCommentButton,
                          clickedCommentButton,
                          setCommentedBy,
                          props.isComment
                        );
                      }}
                      className="d-flex align-items-center card-link ms-1 options"
                      style={{ cursor: "pointer" }}
                    >
                      <ModeCommentOutlinedIcon
                        sx={{
                          color:
                            clickedCommentButton || commentButtonHover
                              ? "#1DA1F2"
                              : "rgb(83, 100, 113)",
                          fontSize: "18px",
                        }}
                      />
                      <span
                        style={{
                          color:
                            clickedCommentButton || commentButtonHover
                              ? "#1DA1F2"
                              : "rgb(83, 100, 113)",
                        }}
                      >
                        {" "}
                        {comments}{" "}
                      </span>
                    </div>
                    <div
                      onMouseEnter={handleLikesButtonHover}
                      onMouseLeave={handleLikesButtonHover}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleLike(
                          props.tweet,
                          setLikes,
                          props.isComment,
                          liked,
                          setLiked
                        );
                      }}
                      className="d-flex align-items-center card-link ms-5 options"
                      style={{ cursor: "pointer" }}
                    >
                      {liked ? (
                        <FavoriteIcon
                          sx={{ color: "rgb(249, 24, 128)", fontSize: "18px" }}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          sx={{
                            color: likesButtonHover
                              ? "rgb(249, 24, 128)"
                              : "rgb(83, 100, 113)",
                            fontSize: "18px",
                          }}
                        />
                      )}
                      <span
                        style={{
                          color:
                            liked || likesButtonHover
                              ? "rgb(249, 24, 128)"
                              : "rgb(83, 100, 113)",
                        }}
                      >
                        {" "}
                        {likes}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {clickedCommentButton && (
          <TweetArea
            tweet={props.tweet}
            user={props.currentUser || props.user}
            text="Post a comment..."
            buttonText="Reply"
            style={{
              marginTop: "14px",
              padding: "16px",
              border: "none",
              backgroundColor: "white",
            }}
            makeReply={true}
            comments={comments}
            setNewComment={props.setNewComment}
            setComments={setComments}
            isComment={props.isComment}
          />
        )}
      </div>
    </div>
  );
}
