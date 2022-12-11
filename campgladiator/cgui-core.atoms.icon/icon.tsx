import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./icon.module.scss";

const baseUrl = "https://cgcdn.s3.amazonaws.com/global-ui/icons";

export type IconProps = {
  children: ReactNode;
};

export type StandardProps = {
  className?: string;
  name: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export type MonochromeProps = {
  className?: string;
  name: string;
  emphasis?: "gladiator" | "gray" | "white";
} & React.HTMLAttributes<HTMLImageElement>;

const Icon = ({ children }: IconProps) => <>{children}</>;

const Solid = ({ className = "", name, ...props }: StandardProps) => (
  <Icon>
    <span
      className={classNames(styles.solidIcon, className)}
      data-icon={name}
      {...props}
    />
  </Icon>
);

const Line = ({ className = "", name, ...props }: StandardProps) => (
  <Icon>
    <span
      className={classNames(styles.lineIcon, className)}
      data-icon={name}
      {...props}
    />
  </Icon>
);

const Monochrome = ({
  className = "",
  name,
  emphasis = "gray",
  ...props
}: MonochromeProps) => {
  const url = `${baseUrl}/${emphasis}/${name}.svg`;

  return (
    <Icon>
      <img
        className={classNames(styles.monochromeIcon, className)}
        src={url}
        alt="Monochrome Icon"
        {...props}
      />
    </Icon>
  );
};

export default { Icon, Solid, Line, Monochrome };
