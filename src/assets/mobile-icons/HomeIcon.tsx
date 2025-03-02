import React from "react";

const HomeIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 14.061,
  height = 16.17,
  className = "",
}) => {
  return (
    <svg
      id="Group_3635"
      data-name="Group 3635"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25.56 24.641"
      className={className}
    >
      <path
        id="Path_3359"
        data-name="Path 3359"
        d="M13.635,4.214a.913.913,0,0,1,1.29,0L25.5,14.791a.913.913,0,1,0,1.29-1.291L16.216,2.923a2.739,2.739,0,0,0-3.873,0L1.767,13.5a.913.913,0,1,0,1.291,1.29Z"
        transform="translate(-1.5 -2.121)"
        fill={fillColor}
        stroke={borderColor}
      />
      <path
        id="Path_3360"
        data-name="Path 3360"
        d="M13.791,5.432l9.931,9.931c.037.037.073.071.111.1v7.544a2.283,2.283,0,0,1-2.282,2.282H17.443a.913.913,0,0,1-.913-.913V18.9a.913.913,0,0,0-.913-.913H11.966a.913.913,0,0,0-.913.913V24.38a.913.913,0,0,1-.913.913H6.032A2.282,2.282,0,0,1,3.75,23.011V15.467q.057-.051.111-.1Z"
        transform="translate(-1.011 -1.402)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default HomeIcon;
