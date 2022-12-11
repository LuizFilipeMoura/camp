import React, { memo } from "react";
import styles from "./card.module.scss";

export type CardProps = {
  flat?: boolean;
  raised?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const propsToClassNames = (flat = false, raised = false) =>
  [flat && styles["card--flat"], raised && styles["card--raised"]].join(" ");

const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      flat = false,
      raised = false,
      className = "",
      children,
      ...props
    }: CardProps,
    ref
  ) => (
    <article
      className={`${styles.card} ${propsToClassNames(
        flat,
        raised
      )} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </article>
  )
);

export default memo(Card);
