import BASE_URL from "../../apiConfig";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Tweet.css";
import ProfileImage from "../ProfileImage";
import NameAndId from "../ProfileBox/NameAndId";
import TweetArea from "./TweetArea";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import Tweet from "./Tweet";
import { TweetSkeletonLoader } from "../SkeletonLoader";
import { UserContext } from "../../Context/UserContext";

export default function Comments(props) {
  const [likes, setLikes] = useState(props.tweet.likes);
  const [comments, setComments] = useState(0);
  const [clickedComments, setClickedComments] = useState(false);
  const [commentedBy, setCommentedBy] = useState(null);
  const { DarkMode, setDarkMode } = useContext(UserContext);

  useEffect(() => {
    const getComments = () => {
      axios
        .post(
          `${BASE_URL}/tweet/getcomments`,
          {
            tweetId: props.tweet._id, // might be the commentId, bcz comment is treated as tweet
          },
          { withCredentials: true }
        )
        .then((res) => {
          setCommentedBy(res.data.comments.reverse());
          props.setNewComment(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getComments();
  }, [props.newComment]);

  if (commentedBy == null) {
    return (
      <>
        {" "}
        <TweetSkeletonLoader /> <TweetSkeletonLoader />{" "}
      </>
    );
  }

  return (
    <div>
      {/* Tweet component is used for comments too */}
      {commentedBy.map((commentBy, index) => {
        let user = {
          name: commentBy.name,
          username: commentBy.username,
          picture: commentBy.picture,
        };
        let liked = commentBy.likedBy.filter((likedBy) => {
          return likedBy === props.user.username;
        });
        return (
          <Tweet
            currentActiveAccountIdx={props.currentActiveAccountIdx}
            key={index}
            tweet={commentBy}
            liked={liked.length}
            user={user}
            currentUser={props.user}
            isComment={true}
            style={{ cursor: "pointer" }}
            disableDeleteTweet={true}
          />
        );
      })}
    </div>
  );
}
