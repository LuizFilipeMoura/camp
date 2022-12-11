import React from "react";
import classNames from "classnames";
import {Icon} from "../cgui-core.atoms.icon";
import {ListMenu, ListMenuProps,} from "../cgui-core.molecules.list-menu";
import {Paragraph} from "../cgui-core.atoms.typography";
import {generateSandwichMenu} from "./generateSandwichMenu";
import styles from "./header.module.scss";
import { Tooltip } from "../cgui-core.atoms.tooltip";
import { Button, ButtonProps } from '../cgui-core.atoms.button';
import { Avatar, AvatarProps } from '../cgui-core.atoms.avatar';
import { breakpoints } from '../cgui-core.utilities.helpers.resolution-variables';
import { useDeviceWidth } from '../cgui-core.utilities.hooks.use-device-width';
import { Logo } from '../cgui-core.atoms.logo';

type MenuItemsProps = {
    headerLinks: HeaderLinksProps[];
};

type AccessoryItemProps = {
    label: string;
    link?: string;
    newTab?: boolean;
    tooltipText?: string;
};

type SandwichButtonProps = {
    isLoggedIn?: boolean;
    mappedItems: ListMenuProps["items"];
};

type UserButtonProps = {
    avatar?: AvatarProps;
    items: ListMenuProps["items"];
};

export type HeaderLinksProps = {
    items?: ListMenuProps["items"];
    label: string;
    link: string;
    isActiveRoute?: boolean;
    newTab?: boolean;
};

export type GenerateSandwichMenuArgs = {
    headerLinks: HeaderLinksProps[];
    isLoggedIn: boolean;
    loginUrl?: string;
};

const MenuItems = ({headerLinks}: MenuItemsProps) => (
    <div className={styles.headerLinksContainer}>
        <ul className={styles.list}>
            {headerLinks?.map((item, index) => {
                const isActiveRoute = item.isActiveRoute;
                return (
                    <li className={styles.item} key={index}>
                        <a
                            target={item.newTab ? "_blank" : "_self"}
                            className={styles.link}
                            href={item.link}
                        >
                            <Paragraph
                                size="small"
                                style={isActiveRoute ? {color: "#333333"} : {}}
                                weight={isActiveRoute ? "normal" : "book"}
                            >
                                {item.label}
                            </Paragraph>
                        </a>
                        {item.items && (
                            <Icon.Line name="icon-angle-down" className={styles.arrowIcon}/>
                        )}
                        {item.items && (
                            <ListMenu items={item.items} className={styles.itemListHeader}/>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
);

const AccessoryItem = ({
                           label,
                           link,
                           newTab,
                           tooltipText,
                       }: AccessoryItemProps) => (
    <div className={styles.accessoryItemContainer}>
        {tooltipText && (
            <Tooltip raised arrow="top" className={styles.itemListHeader}>
                <Paragraph size="small">{tooltipText}</Paragraph>
            </Tooltip>
        )}
        <a className={styles.link} target={newTab ? "_blank" : "_self"} href={link}>
            <Paragraph size="small">{label}</Paragraph>
        </a>
    </div>
);

const SandwichButton = ({mappedItems, isLoggedIn}: SandwichButtonProps) => (
    <div
        className={classNames(
            styles.sandwichButton,
            isLoggedIn ? styles.isLoggedIn : styles.isNotLoggedIn
        )}
    >
        <button className={classNames(styles.item, styles.menuButton)}>
            <Icon.Line name={"icon-bars"}/>
        </button>
        <ListMenu items={mappedItems} className={styles.itemListHeader}/>
    </div>
);

export type HeaderButtonProps = {
    label: string;
    buttonType?: "action" | "link";
} & ButtonProps;

const HeaderButton = (props: HeaderButtonProps) => {
    const deviceWidth = useDeviceWidth();
    let size = "small";
    if (deviceWidth < breakpoints.tabletSmall) size = "xsmall";
    return (
        <div className={styles.buttonContainer}>
            <Button {...props} size={size as any}>
                {props.label}
            </Button>
        </div>
    );
};

const HeaderAvatar = ({avatar, items}: UserButtonProps) => {
    const logoutItem: ListMenuProps["items"] = [
        {type: "divider"},
        {
            type: "item",
            text: "Log Out",
            itemId: "6",
            link: {url: "www.campgladiator.com"},
        },
    ];

    return (
        <div className={styles.userButtonContainer}>
            <div className={styles.userButton}>
                <Avatar size="24px" src={avatar?.src}/>
                <Icon.Line name="icon-angle-down" className={styles.arrowIcon}/>
                {!!items && (
                    <ListMenu
                        items={items?.concat(logoutItem)}
                        className={styles.itemListHeader}
                    />
                )}
            </div>
        </div>
    );
};

type HeaderButtonsProps = {
    buttons: HeaderButtonProps[];
};

const HeaderButtons = ({buttons}: HeaderButtonsProps) => {
    return (
        <>
            {buttons.map((buttonProps, index) => (
                <HeaderButton {...buttonProps} key={index}/>
            ))}
        </>
    );
};

type CollapsedHeaderProps = {
    accessoryItem?: HeaderLinksProps;
    deviceWidth: number;
    headerLinks: HeaderLinksProps[];
    isLoggedIn?: boolean;
    buttons: HeaderButtonProps[];
    userButton?: UserButtonProps;
    loginUrl: string;
};

const CollapsedHeader = ({
                             headerLinks,
                             isLoggedIn = false,
                             deviceWidth,
                             accessoryItem,
                             buttons,
                             userButton,
                             loginUrl,
                         }: CollapsedHeaderProps) => {
    const {tabletSmall} = breakpoints;
    const isBiggerThanTabletSmall = deviceWidth > tabletSmall;

    const shouldAddAccessoryItem = isBiggerThanTabletSmall || !accessoryItem;

    const mappedItems = generateSandwichMenu({
        headerLinks: shouldAddAccessoryItem ? headerLinks : [...headerLinks, accessoryItem],
        isLoggedIn,
        loginUrl,
    });

    return (
        <div className={styles.collapsedMenuItemsContainer}>
            {accessoryItem && isBiggerThanTabletSmall && (
                <AccessoryItem {...accessoryItem} />
            )}
            {isLoggedIn && userButton && <HeaderAvatar {...userButton} />}
            <HeaderButtons buttons={buttons}/>
            {mappedItems.length !== 0 && <SandwichButton mappedItems={mappedItems} isLoggedIn={isLoggedIn}/>}
        </div>
    );
};

type FullHeaderProps = {
    accessoryItem?: AccessoryItemProps;
    deviceWidth?: number;
    headerLinks: HeaderLinksProps[];
    isLoggedIn?: boolean;
    buttons: HeaderButtonProps[];
    loginUrl: string;
    userButton?: UserButtonProps;
};

const LargeHeader = ({
                         accessoryItem,
                         headerLinks,
                         isLoggedIn,
                         buttons,
                         loginUrl,
                         userButton,
                     }: FullHeaderProps) => (
    <>
        <MenuItems headerLinks={headerLinks}/>
        {accessoryItem && <AccessoryItem {...accessoryItem} />}
        {isLoggedIn && userButton && <HeaderAvatar {...userButton} />}
        {!isLoggedIn && (
            <HeaderButton
                buttonType='link'
                label="Log In"
                target="_blank"
                variation="outline"
                emphasis="secondary"
                href={loginUrl}/>
        )}
        <HeaderButtons buttons={buttons}/>
    </>
);

export type HeaderProps = {
    /**
     * An item that will be collapsed into the sub menu only at a mobile size.
     */
    accessoryItem?: HeaderLinksProps;
    /**
     * Determines whether the logo will be dynamic and show text depending on the
     * width or only ever show the logo without text
     */
    displayLogoIcon?: boolean;
    /**
     * Links for the header
     */
    headerLinks?: HeaderLinksProps[];
    /**
     * Sets the page destination of the login button inside sub menus
     */
    loginUrl: string;
    /**
     * Displays the header as logged in or logged out
     */
    isLoggedIn?: boolean;
    /**
     * An array of buttons. They have the same props as the "Button" with the
     * addition of "label" (string) as the text label on the button.
     */
    buttons?: HeaderButtonProps[];
    /**
     * Defines the avatar and its menus if the user is logged in
     */
    userButton?: UserButtonProps;
} & React.HTMLAttributes<HTMLDivElement>;

export function Header({
                           displayLogoIcon,
                           headerLinks = [],
                           isLoggedIn,
                           buttons = [],
                           accessoryItem,
                           userButton,
                           loginUrl = "",
                       }: HeaderProps) {
    const deviceWidth = useDeviceWidth();
    const {desktop, tabletLarge} = breakpoints;
    const isCollapsedHeader = deviceWidth < tabletLarge;
    const isFullIconLogo = deviceWidth >= desktop && !displayLogoIcon;
    const mainMenuType = isFullIconLogo ? "full" : "icon";
    const logoWidth = isFullIconLogo
        ? "190px"
        : isCollapsedHeader
            ? "30px"
            : "40px";

    return (
        <header className={styles.header}>
            <a href="/">
                <Logo type={mainMenuType} width={logoWidth}/>
            </a>
            <nav className={styles.nav}>
                {isCollapsedHeader ? (
                    <CollapsedHeader
                        headerLinks={headerLinks}
                        isLoggedIn={isLoggedIn}
                        deviceWidth={deviceWidth}
                        accessoryItem={accessoryItem}
                        buttons={buttons}
                        userButton={userButton}
                        loginUrl={loginUrl}
                    />
                ) : (
                    <LargeHeader
                        headerLinks={headerLinks}
                        isLoggedIn={isLoggedIn}
                        buttons={buttons}
                        accessoryItem={accessoryItem}
                        loginUrl={loginUrl}
                        userButton={userButton}
                    />
                )}
            </nav>
        </header>
    );
}
