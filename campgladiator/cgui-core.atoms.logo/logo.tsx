import React, { memo } from "react";
import styles from "./logo.module.scss";

export type LogoProps = {
  className?: string;
  type?: "full" | "icon";
  fullType?:
    | "red-dark-gray"
    | "red-white"
    | "dark-gray-white"
    | "white"
    | "dark-gray";
  iconType?: "red" | "dark-gray" | "white" | "light-gray" | "navy" | "gray";
  width?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Logo = ({
  className = "",
  type = "full",
  fullType = "red-dark-gray",
  iconType = "red",
  width = type === "full" ? "120px" : "20px",
  style,
  ...props
}: LogoProps) => (
  <div
    className={`${styles.logo} ${className}`}
    data-type={type}
    style={{ width: width, ...style }}
    {...props}
  >
    <span
      className={`${styles.img}`}
      data-type={type}
      data-full-type={fullType}
      data-icon-type={iconType}
    >
      {type === "full" && `Camp Gladiator`}
      {type === "icon" && `CG`}
    </span>
  </div>
);

export default memo(Logo);
