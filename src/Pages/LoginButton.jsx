import BASE_URL from "../apiConfig";
import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";
import { UserContext } from "../Context/UserContext";

export default function LoginButton(props) {
  const navigate = useNavigate();
  const { DarkMode, setDarkMode } = useContext(UserContext);
  
  async function handleGoogleLogin() {
    await axios
      .get(`${BASE_URL}/auth/pre-google`, { withCredentials: true })
      .then(() => {
        window.open(`${BASE_URL}/auth/google`, "_self");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const styling = {
    ...props.style,
  };

  return (
    <a
      className={`submit`}
      onClick={props.isGoogleLogin && handleGoogleLogin}
      style={{ textDecoration: "none" }}
    >
      <button
        className={`d-flex bd-highlight rounded-pill LoginButton ${
          DarkMode ? "hovering-class" : ""
        }`}
        type={props.type}
        style={{background: `${DarkMode?"#282828":""}`, ...styling } }
      >
        {props.icon}
        <span className="ms-2" style={{ fontWeight: "500" }}>
          {" "}
          {props.text}{" "}
        </span>
      </button>
    </a>
  );
}
