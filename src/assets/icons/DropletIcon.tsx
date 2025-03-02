import React from "react";

const DropletIcon: React.FC<IconProps> = ({
  borderColor = "currentColor",
  fillColor = "none",
  width = 15.531,
  height = 18.841,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    viewBox="0 0 15.531 18.841"
    className={className}
  >
    <defs>
      <clipPath id="clip-path">
        <rect
          id="Rectangle_51"
          data-name="Rectangle 51"
          width={width}
          height={height}
          fill={fillColor}
          stroke={borderColor}
        />
      </clipPath>
    </defs>
    <g id="Group_3201" data-name="Group 3201" transform="translate(0 0)">
      <g
        id="Group_46"
        data-name="Group 46"
        transform="translate(0 0)"
        clipPath="url(#clip-path)"
      >
        <path
          id="Path_37"
          data-name="Path 37"
          d="M7.778,18.841A7.773,7.773,0,0,1,.551,8.165,18.324,18.324,0,0,1,5.222,1.714c.458-.444.935-.871,1.43-1.273A1.591,1.591,0,0,1,8.76.363a19.97,19.97,0,0,1,6.164,7.674,7.772,7.772,0,0,1-7.146,10.8M7.794,1.736a20.94,20.94,0,0,0-5.086,5.8,6.729,6.729,0,0,0-.917,4.7,6.1,6.1,0,0,0,7.582,4.68,6.021,6.021,0,0,0,4.111-7.837C12.4,6,10.152,3.82,7.794,1.736"
          transform="translate(0 0)"
          fill={fillColor}
          stroke={borderColor}
        />
        <path
          id="Path_39"
          data-name="Path 39"
          d="M81.173,108.541a1.936,1.936,0,0,1-.071.343,4.914,4.914,0,0,1-3.136,3.03.825.825,0,0,1-1.084-.49.806.806,0,0,1,.492-1.084,3.559,3.559,0,0,0,2.171-2.118.781.781,0,0,1,.984-.51.815.815,0,0,1,.644.829"
          transform="translate(-68.644 -96.219)"
          fill={fillColor}
          stroke={borderColor}
        />
      </g>
    </g>
  </svg>
);

export default DropletIcon;
