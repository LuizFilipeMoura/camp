import React, { ReactNode, createElement } from "react";
import classNames from "classnames";
import styles from "./typography.module.scss";

export type ParagraphProps = {
  size?: "tiny" | "xsmall" | "small" | "default" | "large" | "xlarge";
  weight?: "book" | "normal" | "bold";
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

export type HeadingProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  font?: "gotham" | "united";
  variation?: "default" | "display";
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

export type LabelProps = {
  size?: "xsmall" | "small" | "default" | "large" | "xlarge";
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Paragraph = ({
  size = "default",
  weight = "normal",
  className = "",
  children,
  ...props
}: ParagraphProps) => (
  <p
    className={`${styles.paragraph} ${className}`}
    data-size={size}
    data-weight={weight}
    {...props}
  >
    {children}
  </p>
);

export const Heading = ({
  type = "h1",
  font = "gotham",
  variation = font === "united" ? "display" : "default",
  className = "",
  children,
  ...props
}: HeadingProps) => {
  const newClasses = classNames(`${styles.heading} ${className}`);
  const newProps = { "data-font": font, "data-variation": variation, ...props };
  return createElement(type, { className: newClasses, ...newProps }, children);
};

export const Label = ({
  size = "default",
  className = "",
  children,
  ...props
}: LabelProps) => (
  <span data-size={size} className={`${styles.label} ${className}`} {...props}>
    {children}
  </span>
);
