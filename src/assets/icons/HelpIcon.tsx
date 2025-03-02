import React from "react";

const HelpIcon: React.FC<IconProps> = ({
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
      viewBox="0 0 17.182 17.181"
      className={className}
    >
      <g
        id="Group_2475"
        data-name="Group 2475"
        transform="translate(0.75 0.75)"
      >
        <ellipse
          id="Ellipse_465"
          data-name="Ellipse 465"
          cx="7.841"
          cy="7.841"
          rx="7.841"
          ry="7.841"
          transform="translate(0 0)"
          fill={fillColor}
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_3028"
          data-name="Path 3028"
          d="M9.09,8.551a2.328,2.328,0,0,1,4.525.776c0,1.552-2.328,2.328-2.328,2.328"
          transform="translate(-3.587 -2.96)"
          fill={fillColor}
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <line
          id="Line_418"
          data-name="Line 418"
          transform="translate(7.318 11.5)"
          fill={fillColor}
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

export default HelpIcon;
