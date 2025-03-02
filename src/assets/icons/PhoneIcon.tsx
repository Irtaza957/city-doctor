import React from "react";

const PhoneIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 16.5,
  height = 16.5,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16.5 16.5"
      className={className}
    >
      <path
        id="Path_2827"
        data-name="Path 2827"
        d="M9.323,13.145a13.8,13.8,0,0,0,6.041,6.036L17.38,17.16a.92.92,0,0,1,.93-.225,10.435,10.435,0,0,0,3.272.522.913.913,0,0,1,.917.917v3.208a.913.913,0,0,1-.917.917A15.582,15.582,0,0,1,6,6.917.916.916,0,0,1,6.917,6h3.208a.913.913,0,0,1,.917.917,10.435,10.435,0,0,0,.523,3.273.92.92,0,0,1-.225.93Z"
        transform="translate(-6 -6)"
        fill={fillColor}
        stroke={borderColor}
      />
    </svg>
  );
};

export default PhoneIcon;
