import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/progressBar.scss";

const ProgressBar = ({ percentage }) => {
  const location = useLocation();
  const [isWellness, setIsWellness] = useState(
    location.pathname.includes("wellness") ? true : false
  );

  useEffect(() => {
    if (location.pathname.includes("wellness")) {
      setIsWellness(true);
    } else {
      setIsWellness(false);
    }
  }, [location]);

  return (
    <div className="progress_bar">
      <div
        style={{ width: `${percentage}%` }}
        className={`fill ${isWellness ? "wellness" : ""}`}
      ></div>
      <span>{percentage}%</span>
    </div>
  );
};

export default ProgressBar;
