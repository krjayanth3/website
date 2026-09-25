import type { IconType } from "react-icons";

export const PowerBiLogo: IconType = ({
  className,
  color = "currentColor",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M4.75 9.25A1.75 1.75 0 0 1 6.5 7.5h1.25A1.75 1.75 0 0 1 9.5 9.25v9A1.75 1.75 0 0 1 7.75 20H6.5a1.75 1.75 0 0 1-1.75-1.75z"
      fill={color}
      opacity="0.82"
    />
    <path
      d="M10.25 6.25A1.75 1.75 0 0 1 12 4.5h1.25A1.75 1.75 0 0 1 15 6.25v12A1.75 1.75 0 0 1 13.25 20H12a1.75 1.75 0 0 1-1.75-1.75z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M15.75 4.5A1.75 1.75 0 0 1 17.5 2.75h1.25a1.75 1.75 0 0 1 1.75 1.75v13.75A1.75 1.75 0 0 1 18.75 20H17.5a1.75 1.75 0 0 1-1.75-1.75z"
      fill={color}
    />
  </svg>
);
