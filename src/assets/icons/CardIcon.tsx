import React from "react";

const CardIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 21.485,
  height = 16.247,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 21.485 16.247"
    className={className}
  >
    <path
      id="Path_3029"
      data-name="Path 3029"
      d="M21.087,8.361H19.069l-.578-3.275a1.408,1.408,0,0,0-1.622-1.138L2.159,6.542A1.4,1.4,0,0,0,1.024,8.165l1.569,8.894A1.4,1.4,0,0,0,4.215,18.2l.536-.095v.673a1.4,1.4,0,0,0,1.4,1.4H21.087a1.4,1.4,0,0,0,1.4-1.4V9.761A1.4,1.4,0,0,0,21.087,8.361Zm.058,1.4v1.317H6.1L6.15,9.7ZM3.915,16.826,2.6,9.37,2.392,7.864,17.169,5.318l.537,3.043H6.15a1.4,1.4,0,0,0-1.4,1.4v6.954Zm17.172,2L6.094,18.775v-5.32H21.145v5.32A.057.057,0,0,1,21.087,18.831Z"
      transform="translate(-1.002 -3.927)"
      fill={fillColor}
      stroke={borderColor}
    />
  </svg>
);

export default CardIcon;
