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
      viewBox="0 0 14.061 16.17"
      className={className}
    >
      <g id="Group_2474" data-name="Group 2474" transform="translate(0 0)">
        <path
          id="Path_3025"
          data-name="Path 3025"
          d="M17.515,8.03A3.515,3.515,0,1,1,21.03,4.515,3.515,3.515,0,0,1,17.515,8.03Zm0-5.624a2.109,2.109,0,1,0,2.109,2.109A2.109,2.109,0,0,0,17.515,2.406Z"
          fill={fillColor}
          stroke={borderColor}
          transform="translate(-10.485 -1)"
        />
        <path
          id="Path_3026"
          data-name="Path 3026"
          fill={fillColor}
          stroke={borderColor}
          d="M17.358,31.436H4.7a.7.7,0,0,1-.7-.7V28.624A5.624,5.624,0,0,1,9.624,23h2.812a5.624,5.624,0,0,1,5.624,5.624v2.109A.7.7,0,0,1,17.358,31.436ZM5.406,30.03H16.655V28.624a4.218,4.218,0,0,0-4.218-4.218H9.624a4.218,4.218,0,0,0-4.218,4.218Z"
          transform="translate(-4 -15.267)"
        />
      </g>
    </svg>
  );
};

export default UserIcon;
