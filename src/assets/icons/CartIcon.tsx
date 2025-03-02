import React from "react";

const CartIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 24,
  height = 23,
  className = "",
}) => {
  return (
    <svg
      id="Group_2280"
      data-name="Group 2280"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 23"
      className={className}
    >
      <circle
        id="Ellipse_446"
        data-name="Ellipse 446"
        cx="1"
        cy="1"
        r="1"
        transform="translate(8 20)"
        fill={fillColor}
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        id="Ellipse_447"
        data-name="Ellipse 447"
        cx="1"
        cy="1"
        r="1"
        transform="translate(19 20)"
        fill={fillColor}
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        id="Path_2871"
        data-name="Path 2871"
        d="M1,1H5L7.68,14.39a2,2,0,0,0,2,1.61H19.4a2,2,0,0,0,2-1.61L23,6H6"
        fill={fillColor}
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CartIcon;
