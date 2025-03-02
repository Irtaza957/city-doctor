import React from "react";

const CircleCheckIcon: React.FC<IconProps> = ({
  fillColor = "none",
  width = 21.793,
  height = 21.793,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21.793 21.793"
      className={className}
    >
      <g id="_icons" transform="translate(0 0)">
        <path
          id="Path_3439"
          data-name="Path 3439"
          d="M10.053,17.2a1.1,1.1,0,0,0,.969.484,1.1,1.1,0,0,0,.969-.484l5.448-7.264A1.3,1.3,0,0,0,17.2,8.237a1.3,1.3,0,0,0-1.695.242l-4.48,5.932-.847-1.09a1.3,1.3,0,0,0-1.695-.242,1.3,1.3,0,0,0-.242,1.695Z"
          transform="translate(-1.941 -1.941)"
          fill={fillColor}
        />
        <path
          id="Path_3440"
          data-name="Path 3440"
          d="M13.9,24.793A10.9,10.9,0,1,0,3,13.9,10.851,10.851,0,0,0,13.9,24.793Zm0-19.371A8.475,8.475,0,1,1,5.421,13.9,8.423,8.423,0,0,1,13.9,5.421Z"
          transform="translate(-3 -3)"
          fill={fillColor}
        />
      </g>
    </svg>
  );
};

export default CircleCheckIcon;
