import React from "react";

const WalletIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 16.71,
  height = 15.317,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16.71 15.317"
    className={className}
  >
    <path
      id="Path_2613"
      data-name="Path 2613"
      d="M2.785,5.177a1.392,1.392,0,1,1,0-2.785h11.14V3.785h1.392V1H2.785A2.793,2.793,0,0,0,0,3.785v9.051a3.447,3.447,0,0,0,3.481,3.481H16.71V5.177Zm12.532,9.747H3.481a2.051,2.051,0,0,1-2.089-2.089V6.152a2.51,2.51,0,0,0,1.392.418H15.317ZM11.14,12.14a1.392,1.392,0,1,0-1.392-1.392A1.4,1.4,0,0,0,11.14,12.14Z"
      transform="translate(0 -1)"
      fill={fillColor}
      stroke={borderColor}
    />
  </svg>
);

export default WalletIcon;
