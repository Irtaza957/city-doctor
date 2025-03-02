import React from "react";

const TickIcon: React.FC<IconProps> = ({
  fillColor = "none",
  width = 27.91,
  height = 20.467,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 27.91 20.467"
      className={className}
    >
      <path
        id="check_x5F_mark_1_"
        d="M12.117,27.188,3.279,18.35a1.13,1.13,0,0,1,0-1.489l1.4-1.4a1.13,1.13,0,0,1,1.489,0l6.7,6.7L27.747,7.279a1.13,1.13,0,0,1,1.489,0l1.4,1.4a1.13,1.13,0,0,1,0,1.489L13.606,27.188A1.13,1.13,0,0,1,12.117,27.188Z"
        transform="translate(-3 -7)"
        fill={fillColor}
      />
    </svg>
  );
};

export default TickIcon;
