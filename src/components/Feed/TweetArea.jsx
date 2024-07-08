import BASE_URL from "../../apiConfig";
import React, { useState, useContext } from "react";
import axios from "axios";
import ProfileImage from "../ProfileImage";
import CollectionsIcon from "@mui/icons-material/Collections";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import GeneralButton from "../Buttons/GeneralButton";
import "./TweetArea.css";
import { UserContext } from "../../Context/UserContext";
import { TweetSkeletonLoader } from "../SkeletonLoader";
import AudioRecorder from "./AudioRecorder";

export default function TweetArea(props) {
  const [tweetContent, setTweetContent] = useState("");
  const { DarkMode, setDarkMode } = useContext(UserContext);

  const [audioBlobRef, setAudioBlobRef] = useState(null); // store voice info :)
  const updateAudioBlobRef = (data) => {
    setAudioBlobRef(data);
  };

  if (!props.user) {
    return <TweetSkeletonLoader />;
  }

  const postTweet = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", props.user.name);
    formData.append("username", props.user.username);
    formData.append("tweetContent", tweetContent.trim());

    // Check if audio exists and append it to the formData
    if (audioBlobRef) {
      formData.append("audio", audioBlobRef, "audio.wav");
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/tweet/posttweets`,
        formData,
        {
          withCredentials: true,
          maxContentLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setTweetContent("");
        props.setTweets([res.data.postedTweet, ...props.tweets]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // Clear the audio blob after the request is completed
      updateAudioBlobRef(null);
    }
  };

  const comment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/tweet/comment`,
        {
          comments: props.comments,
          isComment: props.isComment || false,
          tweetId: props.tweet._id,
          tweetContent: tweetContent.trim(),
          audio: audioBlobRef,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTweetContent("");

      if (res.status === 200) {
        props.setComments && props.setComments(res.data.updatedComments);
        props.setNewComment && props.setNewComment(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // Clear the audio blob after the request is completed
      updateAudioBlobRef(null);
    }
  };

  return (
    <div className={"d-flex tweet-area"}>
      <ProfileImage
        style={{ margin: "4px 14px 0 0" }}
        width={props.width}
        height={props.height}
        user={props.user}
      />

      <div className="d-flex flex-column" style={{ width: "100%" }}>
        <form onSubmit={props.makeReply ? comment : postTweet}>
          <textarea
            placeholder={props.text}
            onChange={(e) => {
              setTweetContent(e.target.value);
            }}
            value={tweetContent}
            className={"tweet-area-text-area"}
          ></textarea>

          <div className={"d-flex my-2 align-items-center justify-content-end"}>
            {/* <div className={"d-flex"}>
                            <div href="#"> <CollectionsIcon className={"ms-1"} fontSize="small" sx={{ color: "#1da1f2" }} /> </div>
                            <div href="#"> <GifBoxIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </div>
                            <div href="#"> <SentimentSatisfiedAltIcon className={"ms-3"} fontSize="small" sx={{ color: "#1da1f2" }} /> </div>
                        </div> */}

            <AudioRecorder
              updateAudioBlobRef={updateAudioBlobRef}
              audioBlobRef={audioBlobRef}
            />
            <button
              className={`tweet-button   ${
                DarkMode === true ? "darkMode hovering-class" : ""
              } `}
              disabled={!/\S/.test(tweetContent) && !audioBlobRef}
              style={{
                backgroundColor: `${
                  !audioBlobRef && !/\S/.test(tweetContent)
                    ? "rgb(29, 161, 242, 0.5)"
                    : "rgb(29, 161, 242)"
                }`,
              }}
            >
              {props.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
