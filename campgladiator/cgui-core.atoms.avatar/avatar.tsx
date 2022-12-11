import React, { memo } from "react";
import classNames from "classnames";
import styles from "./avatar.module.scss";

export type AvatarProps = {
  alt?: string;
  className?: string;
  size?: string;
  src?: string;
} & React.HTMLAttributes<HTMLImageElement>;

const Avatar = ({
  alt = "user image",
  className = "",
  size = "48px",
  src = "https://cgcdn.s3.amazonaws.com/global-ui/images/avatars/placeholder.png",
  ...props
}: AvatarProps) => (
  <img
    alt={alt}
    className={classNames(styles.avatar, className)}
    src={src}
    style={{ width: size, height: size, ...props.style }}
    {...props}
  />
);

export default memo(Avatar);
