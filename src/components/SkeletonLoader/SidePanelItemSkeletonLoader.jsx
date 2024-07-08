import React from "react";
// import "./SidePanelItemSkeletonLoader.css";
import {
  ImageSkeletonLoader,
  NameAndIdSkeletonLoader,
  ButtonSkeletonLoader,
} from "./index.js";
import "../SidePanel/SidePanel.css";

const SidePanelItemSkeletonLoader = () => {
  return (
    <li className="d-flex list-group-item my-1 bgc-white side-panel-item ">
      <div className="me-1 pe-2">
        <div className="anchor d-inline-flex align-items-center justify-content-center">
          <ImageSkeletonLoader />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between side-panel-item-content">
        <NameAndIdSkeletonLoader widthName="65%" widthId="45%" />
        <div>
          <ButtonSkeletonLoader />
        </div>
      </div>
    </li>
  );
};

export default SidePanelItemSkeletonLoader;
