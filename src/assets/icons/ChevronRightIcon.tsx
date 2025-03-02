import React from "react";

const ChevronRightIcon: React.FC<IconProps> = ({
  fillColor = "none",
  width = 11.635,
  height = 19.391,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 11.635 19.391"
      className={className}
    >
      <path
        id="Path_2830"
        data-name="Path 2830"
        d="M114.216,160l1.176,1.254-9.7,10.38L96,161.254,97.17,160l8.526,9.12Z"
        transform="translate(-160 115.391) rotate(-90)"
        fill={fillColor}
      />
    </svg>
  );
};

export default ChevronRightIcon;
