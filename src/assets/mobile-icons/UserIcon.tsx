import React from "react";

const UserIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 14.061,
  height = 16.17,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19.756 25.234"
      className={className}
    >
      <path
        id="Path_3376"
        data-name="Path 3376"
        d="M18.193,6.814A4.564,4.564,0,1,1,13.628,2.25a4.564,4.564,0,0,1,4.564,4.564ZM4.5,24a9.128,9.128,0,1,1,18.256,0A21.966,21.966,0,0,1,4.5,24Z"
        transform="translate(-3.751 -1.5)"
        fill={fillColor}
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default UserIcon;
