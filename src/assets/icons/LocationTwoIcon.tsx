import React from "react";

const LocationTwoIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 15.919,
  height = 20.601,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16.919 21.82"
      className={className}
    >
      <path
        id="Path_3592"
        data-name="Path 3592"
        d="M42.019,29.359a7.959,7.959,0,0,0-15.919,0C26.1,33.768,34.059,42,34.059,42S42.019,33.768,42.019,29.359ZM30.353,29.2a3.707,3.707,0,1,1,3.707,3.707A3.73,3.73,0,0,1,30.353,29.2Z"
        transform="translate(-25.6 -20.9)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="1"
      />
    </svg>
  );
};

export default LocationTwoIcon;
