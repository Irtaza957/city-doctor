import React from "react";

const HeartIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 22.55,
  height = 19.426,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 22.55 19.426"
    className={className}
  >
    <g id="Layer_54" data-name="Layer 54" transform="translate(1 1)">
      <path
        id="Path_1536"
        data-name="Path 1536"
        d="M11.294,20.715a2.056,2.056,0,0,1-1.46-.6L2.777,13.054A5.975,5.975,0,0,1,1.05,8.772,5.523,5.523,0,0,1,6.627,3.29a5.523,5.523,0,0,1,3.981,1.638l.685.685.562-.562h0a5.749,5.749,0,0,1,7.537-.61,5.653,5.653,0,0,1,.555,8.469l-7.195,7.2A2.056,2.056,0,0,1,11.294,20.715Z"
        transform="translate(-1.049 -3.29)"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="2"
      />
    </g>
  </svg>
);

export default HeartIcon;
