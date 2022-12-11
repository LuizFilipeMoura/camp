import React, { ReactNode } from "react";
import classNames from "classnames";
import { Icon } from "../cgui-core.atoms.icon";
import {
  Paragraph,
  ParagraphProps,
} from "../cgui-core.atoms.typography";
import styles from "./link.module.scss";

export type LinkProps = {
  className?: string;
  children?: ReactNode;
  hideArrow?: boolean;
  href?: string;
  size?: ParagraphProps["size"];
} & React.HTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  children,
  className = "",
  hideArrow = false,
  size = "default",
  href,
  ...props
}: LinkProps) => (
  <a href={href} className={classNames(styles.link, className)} {...props}>
    <Paragraph size={size} className={styles.text}>
      {children}
    </Paragraph>
    {!hideArrow && (
      <Icon.Line
        className={classNames(styles.icon)}
        data-size={size}
        name={"icon-angle-right"}
      />
    )}
  </a>
);
