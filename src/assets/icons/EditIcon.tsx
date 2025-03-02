import React from "react";

const EditIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 15.708,
  height = 15.844,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15.708 15.844"
      className={className}
    >
      <g
        id="Group_2460"
        data-name="Group 2460"
        transform="translate(0.75 0.886)"
      >
        <path
          id="Path_3001"
          data-name="Path 3001"
          d="M8.355,4H3.412A1.412,1.412,0,0,0,2,5.412V15.3A1.412,1.412,0,0,0,3.412,16.71H13.3A1.412,1.412,0,0,0,14.71,15.3V10.355"
          transform="translate(-2 -2.502)"
          fill={fillColor}
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_3002"
          data-name="Path 3002"
          d="M15.414,2.317a1.5,1.5,0,1,1,2.118,2.118l-6.708,6.708L8,11.85l.706-2.824Z"
          transform="translate(-3.763 -1.879)"
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

export default EditIcon;
