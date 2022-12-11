import React from "react";
import { ListMenuProps } from "../cgui-core.molecules.list-menu";
import { Header, HeaderButtonProps, HeaderLinksProps, HeaderProps } from "./header";

const primaryButton: HeaderButtonProps = {
  label: "Primary Button",
  buttonType: "link",
  href: "www.campgladiator.com",
};

const accessoryItem: HeaderProps["accessoryItem"] = {
  label: "Accessory item",
  link: "link",
  newTab: false,
};

const trainerAccessoryItem: HeaderLinksProps = {
  link: 'www.campgladiator.com',
  label: "+1 (808) 555-0111",
};

const items: ListMenuProps["items"] = [
  {
    type: "item",
    text: "Label Only",
    itemId: "1",
    link: { url: "www.campgladiator.com" },
  },
  {
    type: "item",
    text: "Label and Badge",
    badge: "10",
    link: { url: "www.campgladiator.com" },
    itemId: "2",
  },
  {
    type: "divider",
  },
  { type: "header", text: "Header" },
  {
    type: "item",
    text: "Label and Tag",
    tag: "Tag",
    link: { url: "www.campgladiator.com" },
    itemId: "3",
  },
  {
    type: "item",
    text: "Icon and Label",
    icon: { name: "icon-trophy", type: "line" },
    itemId: "4",
    link: { url: "www.campgladiator.com" },
  },
  {
    type: "item",
    text: "Avatar and label",
    avatar: {},
    link: { url: "www.campgladiator.com" },
    itemId: "5",
  },
];

const userButtonProps: HeaderProps["userButton"] = {
  items: items,
};

const userButtonPropsWithAvatar: HeaderProps["userButton"] = {
  items: items,
  avatar: {
    alt: "Camp Gladiator Trainer",
    src: "https://www.high5inc.org/wp-content/uploads/2019/01/Gina-e1548445277622.jpg",
  },
};

const HeaderLinks: HeaderProps["headerLinks"] = [
  {
    label: "Workout Program",
    link: "/programs/camp",
    newTab: false,
    items: [
      {
        type: "item",
        text: "Workout 1",
        itemId: "1",
        link: { url: "https://campgladiator.com/", newTab: true },
      },
      {
        type: "item",
        text: "Workout 2",
        badge: "newTab",
        itemId: "2",
        link: { url: "https://campgladiator.com/", newTab: true },
      },
      {
        type: "item",
        text: "Workout 3",
        tag: "Tag",
        itemId: "3",
        link: { url: "https://campgladiator.com/", newTab: true },
      },
      {
        type: "item",
        text: "Workout 4",
        icon: { name: "icon-trophy", type: "line" },
        itemId: "4",
        link: { url: "https://campgladiator.com/", newTab: true },
      },
      {
        type: "item",
        text: "Workout 5",
        avatar: {
          src: "https://cgcdn.s3.amazonaws.com/global-ui/images/avatars/placeholder.png",
          alt: "User Name",
        },
        link: { url: "https://campgladiator.com/", newTab: true },
        itemId: "5",
      },
    ],
  },
  { label: "Nutrition", link: "/programs/nutrition", newTab: false },
  { label: "Pricing", link: "/pricing", newTab: false },
  {
    label: "Become a trainer",
    link: "/trainers/become-a-trainer",
    newTab: false,
    items: [
      {
        type: "item",
        text: "Trainer 1",
        icon: { name: "icon-trophy", type: "line" },
        link: { url: "https://campgladiator.com/", newTab: true },
        itemId: "1",
      },
      {
        type: "item",
        text: "Trainer 2",
        avatar: {
          src: "https://cgcdn.s3.amazonaws.com/global-ui/images/avatars/placeholder.png",
          alt: "User Name",
        },
        link: { url: "https://campgladiator.com/", newTab: true },
        itemId: "2",
      },
    ],
  },
  {
    label: "Shop Gear",
    link: "https://account.campgladiator.com/#/store/",
    newTab: true,
  },
];

export const FullHeaderLoggedIn = () => (
  <Header
    headerLinks={HeaderLinks}
    isLoggedIn={true}
    userButton={userButtonProps}
    buttons={[primaryButton]}
    accessoryItem={accessoryItem}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);

export const FullHeaderLoggedOut = () => (
  <Header
    headerLinks={HeaderLinks}
    isLoggedIn={false}
    userButton={userButtonProps}
    buttons={[primaryButton]}
    accessoryItem={accessoryItem}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);

export const BasicHeaderPrimaryButton = () => (
  <Header
    headerLinks={HeaderLinks}
    buttons={[primaryButton]}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);

export const BasicHeaderAccessoryItem = () => (
  <Header
    headerLinks={HeaderLinks}
    accessoryItem={accessoryItem}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);

export const LoggedInDefaultAvatarHeader = () => (
  <Header
    headerLinks={HeaderLinks}
    isLoggedIn={true}
    userButton={userButtonProps}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);

export const LoggedInCustomAvatarHeader = () => (
  <Header
    headerLinks={HeaderLinks}
    isLoggedIn={true}
    userButton={userButtonPropsWithAvatar}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);

export const HeaderWithForcedIconLogo = () => (
  <Header
    accessoryItem={trainerAccessoryItem}
    displayLogoIcon
    isLoggedIn={true}
    userButton={userButtonPropsWithAvatar}
    loginUrl="https://staging-account.campgladiator.com/#/profile "
  />
);
