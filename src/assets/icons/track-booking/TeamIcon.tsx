import React from "react";

const TeamIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 19.371,
  height = 21.116,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19.371 21.116"
      className={className}
    >
      <g id="Group_3585" data-name="Group 3585" transform="translate(0 0.445)">
        <circle
          id="Ellipse_502"
          data-name="Ellipse 502"
          cx="5"
          cy="5"
          r="5"
          transform="translate(5.05 -0.445)"
          fill={fillColor}
          stroke={borderColor}
        />
        <path
          id="Path_3425"
          data-name="Path 3425"
          d="M23.371,20.264v1.211a1.211,1.211,0,0,1-1.211,1.211H5.211A1.211,1.211,0,0,1,4,21.475V20.264A7.264,7.264,0,0,1,11.264,13h4.843A7.264,7.264,0,0,1,23.371,20.264Z"
          transform="translate(-4 -2.015)"
          fill={fillColor}
          stroke={borderColor}
        />
      </g>
    </svg>
  );
};

export default TeamIcon;
