import BASE_URL from "../apiConfig";
import React, { useState, useEffect, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import TweetPage from "../Pages/TweetPage";
import FollowPage from "../Pages/FollowPage";
import { UserContext } from "../Context/UserContext";

export default function App() {
  const location = useLocation();
  const addAccountRoute = location.state?.addAccountRoute ?? null;
  const params = useParams();

  const [user, setUser] = useState(null);
  const [parentUser, setParentUser] = useState(null);
  const [signedUpMsg, setSignedUpMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentActiveAccountIdx, setCurrentActiveAccountIdx] = useState(
    params.currentActiveAccountIdx
  );

  const { DarkMode } = useContext(UserContext);

  useEffect(() => {
    if (DarkMode) {
      document.body.classList.add("dark-mode");
      document.body.style.backgroundColor = "#282828";
      document.body.style.color = "white";
    } else {
      document.body.classList.remove("dark-mode");
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [DarkMode]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/auth/login/success`,
          {
            // params: { currentActiveUser: true },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          let user = response.data.currentActiveUser;
          let parentUser = response.data.user;
          setUser(user);
          setParentUser(parentUser);
          let userIdx = parentUser.activeAccounts.findIndex(
            (account) =>
              account.user.username ===
              parentUser.currentActiveAccount.user.username
          );
          setCurrentActiveAccountIdx(userIdx);
        } else {
          throw new Error("Login failed.");
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setSignedUpMsg("");
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  if (isLoading) {
    // if (location.pathname == `/u/:currentActiveAccountIdx/profile`){
    //     return <Profile />;
    // }
    // else
    if (location.pathname == `/u/:currentActiveAccountIdx/explore`) {
      return <Explore />;
    } else {
      return <Home />;
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user || (user && addAccountRoute) ? (
              <Login
                addAccountRoute={addAccountRoute}
                signedUpMsg={signedUpMsg}
                setUser={setUser}
                parentUser={parentUser}
                setParentUser={setParentUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to={`/u/${currentActiveAccountIdx}/home`} replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !user || (user && addAccountRoute) ? (
              <Signup
                setSignedUpMsg={setSignedUpMsg}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to={`/u/${currentActiveAccountIdx}/home`} replace />
            )
          }
        />
        <Route
          exact
          path={`/u/:currentActiveAccountIdx/home`}
          element={
            user ? (
              <Home
                user={user}
                setUser={setUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                parentUser={parentUser}
                setParentUser={setParentUser}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={`/u/:currentActiveAccountIdx/:username/:tweetId/:isComment`}
          element={
            user ? (
              <TweetPage
                user={user}
                setUser={setUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                parentUser={parentUser}
                setParentUser={setParentUser}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={`/u/:currentActiveAccountIdx/explore`}
          element={
            user ? (
              <Explore
                user={user}
                setUser={setUser}
                parentUser={parentUser}
                setParentUser={setParentUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path={`/u/:currentActiveAccountIdx/profile`}
          element={
            user ? (
              <Profile
                user={user}
                setUser={setUser}
                parentUser={parentUser}
                setParentUser={setParentUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={`/u/:currentActiveAccountIdx/profile/:username/:path`}
          element={
            user ? (
              <FollowPage
                user={user}
                setUser={setUser}
                parentUser={parentUser}
                setParentUser={setParentUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
