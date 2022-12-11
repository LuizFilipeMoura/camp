import React, { memo, ReactNode } from "react";
import classNames from "classnames";

import baseStyles from "./tag.module.scss";
import { Paragraph, ParagraphProps } from '../cgui-core.atoms.typography';

export type TagProps = {
  className?: string;
  size?: "default" | "small" | "xsmall" | "tiny";
  emphasis?: "default" | "primary" | "secondary";
  variation?: "default" | "alternative";
  theme?: { readonly [key: string]: string };
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const tagSizeToParagraphSize: {
  [key in TagProps["size"]]: ParagraphProps["size"];
} = {
  tiny: "tiny",
  xsmall: "tiny",
  small: "xsmall",
  default: "small",
};

const Tag = ({
  className = "",
  size = "default",
  emphasis = "default",
  variation = "default",
  theme,
  children,
  ...props
}: TagProps) => {
  const styles = theme || baseStyles;

  return (
    <div
      className={classNames(styles.tag, className)}
      data-emphasis={emphasis}
      data-variation={variation}
      data-size={size}
      {...props}
    >
      <Paragraph size={tagSizeToParagraphSize[size]} weight="bold">
        {children}
      </Paragraph>
    </div>
  );
};

export default memo(Tag);
