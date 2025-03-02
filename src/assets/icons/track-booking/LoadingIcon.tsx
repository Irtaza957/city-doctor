import React from "react";

const LoadingIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  width = 29,
  height = 30,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 29 30"
      className={className}
    >
      <g
        id="Group_3586"
        data-name="Group 3586"
        transform="translate(-0.082 0.398)"
      >
        <rect
          id="Rectangle_1770"
          data-name="Rectangle 1770"
          width="29"
          height="30"
          transform="translate(0.082 -0.398)"
          fill="none"
          stroke="none"
        />
        <path
          id="Path_3427"
          data-name="Path 3427"
          d="M24,4V6.427"
          transform="translate(-9.493 -1.604)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3428"
          data-name="Path 3428"
          d="M33.213,6.679,32,8.781"
          transform="translate(-12.64 -2.658)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3429"
          data-name="Path 3429"
          d="M39.958,14l-2.1,1.213"
          transform="translate(-14.943 -5.537)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3430"
          data-name="Path 3430"
          d="M42.427,24H40"
          transform="translate(-15.787 -9.471)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3431"
          data-name="Path 3431"
          d="M39.958,33.213,37.856,32"
          transform="translate(-14.943 -12.617)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3432"
          data-name="Path 3432"
          d="M33.213,39.958,32,37.856"
          transform="translate(-12.64 -14.921)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3433"
          data-name="Path 3433"
          d="M24,42.427V40"
          transform="translate(-9.493 -15.764)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3434"
          data-name="Path 3434"
          d="M14,39.958l1.213-2.1"
          transform="translate(-5.56 -14.921)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3435"
          data-name="Path 3435"
          d="M6.679,33.213,8.781,32"
          transform="translate(-2.681 -12.617)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3436"
          data-name="Path 3436"
          d="M4,24H6.427"
          transform="translate(-1.627 -9.471)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3437"
          data-name="Path 3437"
          d="M6.679,14l2.1,1.213"
          transform="translate(-2.681 -5.537)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          id="Path_3438"
          data-name="Path 3438"
          d="M14,6.679l1.213,2.1"
          transform="translate(-5.56 -2.658)"
          fill="none"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default LoadingIcon;

