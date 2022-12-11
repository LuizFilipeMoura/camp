import React, { memo } from "react";
import classNames from "classnames";
import { Card, CardProps } from "../cgui-core.atoms.card";
import styles from "./tooltip.module.scss";

export type TooltipProps = {
  className?: string;
  arrow: "left" | "right" | "top" | "bottom";
  /** All CSS properites + one custom prop: "--arrow-size" (type: string) */
  style?: React.CSSProperties & { "--arrow-size": string };
} & CardProps;

const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  ({ arrow, className, children, ...props }: TooltipProps, ref) => (
    <Card
      className={classNames(styles.card, className)}
      data-arrow={arrow}
      ref={ref}
      {...props}
    >
      {children}
    </Card>
  )
);

export default memo(Tooltip);
