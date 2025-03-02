import React from "react";

const LocationIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 14.055 19.091"
      className={className}
    >
      <g id="layer1" transform="translate(0.125 0.125)">
        <path
          id="path929"
          d="M8.222,288.8a6.909,6.909,0,0,0-6.9,6.9c0,6.693,6.511,11.781,6.511,11.781a.627.627,0,0,0,.783,0s6.511-5.088,6.511-11.781A6.913,6.913,0,0,0,8.222,288.8Zm0,1.255a5.639,5.639,0,0,1,5.65,5.645c0,5.475-4.958,9.8-5.645,10.387-.684-.583-5.65-4.91-5.65-10.387A5.635,5.635,0,0,1,8.222,290.052Z"
          transform="translate(-1.322 -288.797)"
          fill={fillColor}
          stroke={borderColor}
          strokeWidth="0.25"
        />
        <path
          id="circle931"
          d="M6.045,290.385a3.137,3.137,0,1,0,3.14,3.135A3.144,3.144,0,0,0,6.045,290.385Zm0,1.255a1.882,1.882,0,1,1-1.88,1.88A1.873,1.873,0,0,1,6.045,291.64Z"
          transform="translate(0.855 -286.62)"
          fill={fillColor}
          stroke={borderColor}
          strokeWidth="0.25"
        />
      </g>
    </svg>
  );
};

export default LocationIcon;
