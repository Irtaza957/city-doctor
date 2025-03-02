import React from "react";

const MobileIcon: React.FC<IconProps> = ({
  fillColor = "none",
  width = 15.273,
  height = 24,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15.273 24"
      className={className}
    >
      <g id="Group_4155" data-name="Group 4155" transform="translate(-5 -1)">
        <path
          id="Path_3589"
          data-name="Path 3589"
          d="M17,1H8.273A3.273,3.273,0,0,0,5,4.273V21.727A3.273,3.273,0,0,0,8.273,25H17a3.273,3.273,0,0,0,3.273-3.273V4.273A3.273,3.273,0,0,0,17,1ZM8.273,3.182H17a1.091,1.091,0,0,1,1.091,1.091v13H7.182v-13A1.091,1.091,0,0,1,8.273,3.182ZM17,22.818H8.273a1.091,1.091,0,0,1-1.091-1.091V19.455H18.091v2.273A1.091,1.091,0,0,1,17,22.818Z"
          fill={fillColor}
        />
        <circle
          id="Ellipse_513"
          data-name="Ellipse 513"
          cx="1"
          cy="1"
          r="1"
          transform="translate(11.637 20)"
          fill={fillColor}
        />
      </g>
    </svg>
  );
};

export default MobileIcon;
