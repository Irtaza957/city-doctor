import React from "react";

const CalendarIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 16.347,
  height = 16.347,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16.347 16.347"
    className={className}
  >
    <path
      id="Path_3027"
      data-name="Path 3027"
      d="M16.488,6.829V4.415h-1.61v.8h-1.61v-.8H6.829v.8H5.219v-.8H3.61V6.829Zm0,1.61H3.61v8.048H16.488ZM14.878,2.8h1.61a1.61,1.61,0,0,1,1.61,1.61V16.487a1.61,1.61,0,0,1-1.61,1.61H3.61A1.61,1.61,0,0,1,2,16.487V4.415A1.61,1.61,0,0,1,3.61,2.8h1.61V2h1.61v.8h6.439V2h1.61ZM7.634,11.658H6.024v-1.61h1.61Zm3.219,0H9.244v-1.61h1.61Zm3.219,0h-1.61v-1.61h1.61ZM7.634,14.878H6.024v-1.61h1.61Zm3.219,0H9.244v-1.61h1.61Z"
      transform="translate(-1.875 -1.875)"
      fill={fillColor}
      stroke={borderColor}
      strokeWidth="0.25"
      fillRule="evenodd"
    />
  </svg>
);

export default CalendarIcon;
