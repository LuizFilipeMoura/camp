import React, { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  ListItem,
  ListItemProps,
} from "../cgui-core.atoms.list-item";
// import { Divider } from "../cgui-core.atoms.divider";
import { Label } from "../cgui-core.atoms.typography";
import { redirectLink } from "../cgui-core.utilities.helpers.redirect-link";
import baseStyles from "./list-menu.module.scss";

export type HeaderProps = {
  type: "header";
  text: string;
};

export type DividerProps = {
  type: "divider";
};

export type ItemProps = { type: "item" } & ListItemProps & Link;

type Link = {
  link?: {
    url: string;
    newTab?: boolean;
  };
};

export type ListMenuProps = {
  className?: string;
  selection?: "single" | "multi";
  size?: "default" | "small";
  items: Array<ItemProps | HeaderProps | DividerProps>;
  initialActiveIds?: Set<ListItemProps["itemId"]>;
  theme?: { readonly [key: string]: string };
} & React.HTMLAttributes<HTMLDivElement>;

const ListMenu = React.forwardRef<HTMLDivElement, ListMenuProps>(
  (
    {
      className = "",
      selection = "single",
      size = "default",
      items,
      initialActiveIds = new Set<ListItemProps["itemId"]>(),
      theme,
      ...props
    }: ListMenuProps,
    ref
  ) => {
    const [activeItemIds, setActiveItemIds] = useState<
      Set<ListItemProps["itemId"]>
    >(
      selection === "multi"
        ? initialActiveIds
        : initialActiveIds.size
        ? new Set([initialActiveIds.values().next().value])
        : initialActiveIds
    );
    const [scrollVisible, setScrollVisible] = useState(false);

    const handleSingleSelectMenuClick = ({ id, link }: ItemProps) => {
      if (link) {
        redirectLink(link.url, link.newTab);
        // @ts-ignore
      } else if (activeItemIds.has(id)) {
        setActiveItemIds(new Set<ListItemProps["itemId"]>());
      } else {
        // @ts-ignore
        const newState = new Set<ListItemProps["itemId"]>([id]);
        setActiveItemIds(newState);
      }
    };

    const handleMultiSelectMenuClick = (id: ListItemProps["itemId"]) => {
      const newState = new Set(activeItemIds);
      activeItemIds.has(id) ? newState.delete(id) : newState.add(id);
      setActiveItemIds(newState);
    };

    const styles = theme || baseStyles;

    const wrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (!wrapperRef || !wrapperRef.current) return;
      const resizeObserver = new ResizeObserver(() => {
        // @ts-ignore
        wrapperRef.current.scrollHeight > wrapperRef.current.clientHeight
          ? setScrollVisible(true)
          : setScrollVisible(false);
      });
      resizeObserver.observe(wrapperRef.current);
      return () => {
        // @ts-ignore
        resizeObserver.unobserve(wrapperRef.current);
      };
    }, [wrapperRef.current]);

    return (
      <div
        className={classNames(styles.listMenu, className)}
        data-size={size}
        ref={ref}
        {...props}
      >
        <div className={styles.content}>
          <div
            ref={wrapperRef}
            className={classNames(styles.wrapper, {
              [styles.scrollVisible]: scrollVisible,
            })}
          >
            {items.map((item, index) => {
              switch (item.type) {
                case "item":
                  return (
                    <ListItem
                      className={classNames(styles.listItem, {
                        [styles.scrollVisible]: scrollVisible,
                      })}
                      key={`item_${item.itemId}`}
                      size={size}
                      active={activeItemIds.has(item.itemId)}
                      handleActive={() => {
                        selection === "multi"
                          ? handleMultiSelectMenuClick(item.itemId)
                          : handleSingleSelectMenuClick(item);
                      }}
                      {...item}
                    />
                  );
                // case "divider":
                //   return (
                //     <Divider
                //       className={styles.divider}
                //       key={`divider_${index}`}
                //     />
                //   );
                case "header":
                  return (
                    <div className={styles.header} key={index}>
                      <Label
                        size="small"
                        className={styles.label}
                        key={`header_${index}`}
                      >
                        {item.text}
                      </Label>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default ListMenu;
