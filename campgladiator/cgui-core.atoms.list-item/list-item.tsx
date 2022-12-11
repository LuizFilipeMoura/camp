import React from "react";
import classNames from "classnames";
import { Icon, StandardProps } from "../cgui-core.atoms.icon";
import { Tag } from "../cgui-core.atoms.tag";
import {
  Paragraph,
  ParagraphProps,
} from "../cgui-core.atoms.typography";
import baseStyles from "./list-item.module.scss";
import { Avatar, AvatarProps } from '../cgui-core.atoms.avatar';

type Icon = { type: "line" | "solid" } & StandardProps;

const listItemSizeToParagraphSize: {
  // @ts-ignore
  [key in ListItemProps["size"]]: ParagraphProps["size"];
} = {
  small: "xsmall",
  default: "small",
};

export type ListItemProps = {
  itemId: string;
  text?: string;
  active?: boolean;
  size?: "default" | "small";
  handleActive?: () => void;
  handleClick?: () => void;
  theme?: { readonly [key: string]: string };
  disablePointer?: boolean;
} & ({ icon?: Icon; avatar?: never } | { icon?: never; avatar?: AvatarProps }) &
  ({ tag?: string; badge?: never } | { tag?: never; badge?: string }) &
  React.HTMLAttributes<HTMLDivElement>;

const ListItem = ({
  itemId,
  className,
  text,
  active = false,
  icon,
  badge,
  tag,
  avatar,
  size = "default",
  theme,
  disablePointer,
  handleActive = () => {},
  handleClick = () => {},
  ...props
}: ListItemProps) => {
  const hasAvatar = !!avatar;
  const hasIcon = !!icon;
  const hasBadge = !!badge;
  const hasTag = !!tag;

  const styles = theme || baseStyles;

  return (
    <div
      className={classNames(styles.item, className, {
        [styles.active]: active,
        [styles.disablePointer]: disablePointer,
      })}
      data-id={itemId}
      data-size={size}
      onClick={() => {
        handleClick();
        handleActive();
      }}
      {...props}
    >
      {hasAvatar && (
        <Avatar
          className={styles.avatar}
          alt={avatar.alt || undefined}
          size="24px"
          src={avatar.src}
        />
      )}

      {icon?.type === "solid" && (
        <Icon.Solid className={styles.icon} name={icon.name} />
      )}
      {icon?.type === "line" && (
        <Icon.Line className={styles.icon} name={icon.name} />
      )}

      <Paragraph
        size={listItemSizeToParagraphSize[size]}
        weight="book"
        className={classNames(styles.p, {
          [styles.extraLeftMargin]: !hasAvatar && !hasIcon,
          [styles.extraRightMargin]: !hasBadge && !hasTag,
        })}
      >
        {text}
      </Paragraph>

      {hasTag && (
        <Tag
          className={styles.tag}
          children={tag}
          size="tiny"
          variation="alternative"
          emphasis="primary"
        />
      )}

    </div>
  );
};

export default ListItem;
