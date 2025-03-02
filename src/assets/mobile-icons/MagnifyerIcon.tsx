import React from "react";

const MagnifyerIcon: React.FC<IconProps> = ({
  fillColor = "none",
  width = 14.061,
  height = 16.17,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 23.241 23.241"
      className={className}
    >
      <path
        id="Path_1029"
        data-name="Path 1029"
        d="M322.386,319.24a7.855,7.855,0,1,1,13.516,5.444,1.182,1.182,0,0,0-.218.218,7.854,7.854,0,0,1-13.3-5.661Zm14.2,8.034a10.241,10.241,0,1,1,1.686-1.686l4.117,4.117a1.192,1.192,0,0,1-1.686,1.686Z"
        transform="translate(-319.75 -308.75)"
        fill={fillColor}
        strokeWidth="0.5"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default MagnifyerIcon;
