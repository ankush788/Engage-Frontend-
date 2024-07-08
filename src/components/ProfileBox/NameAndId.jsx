import React from "react";
import "./NameAndId.css";
import { NameAndIdSkeletonLoader } from "../SkeletonLoader";

export default function NameAndId(props) {
  if (!props.user) {
    return <NameAndIdSkeletonLoader />;
  }

  let userCopy = JSON.parse(JSON.stringify(props.user));

  if (!props.profileBox && userCopy.username.length > 18) {
    userCopy.username = userCopy.username.substring(0, 18) + "...";
  }

  return (
    <div
      className="d-inline-flex flex-column name-and-id"
    >
      <p> {userCopy.name} </p>
      <div>
        <span> {userCopy.username} </span>
      </div>
    </div>
  );
}
