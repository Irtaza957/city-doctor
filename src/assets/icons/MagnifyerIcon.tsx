import React from "react";

const MagnifyerIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 27.003,
  height = 27.003,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 27.003 27.003"
      className={className}
    >
      <path
        id="Path_2829"
        data-name="Path 2829"
        d="M73.5,71.3l-5.871-5.871a10.912,10.912,0,1,0-2.2,2.2L71.3,73.5a1.56,1.56,0,0,0,2.2-2.2ZM51.115,58.9A7.787,7.787,0,1,1,58.9,66.688,7.787,7.787,0,0,1,51.115,58.9Z"
        transform="translate(-47.5 -47.5)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="1"
      />
    </svg>
  );
};

export default MagnifyerIcon;
