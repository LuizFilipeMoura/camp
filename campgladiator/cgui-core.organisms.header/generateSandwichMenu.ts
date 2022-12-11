import { DividerProps, ItemProps, HeaderProps } from "../cgui-core.molecules.list-menu";
import { GenerateSandwichMenuArgs, HeaderLinksProps } from "./header";

export type ListItem = ItemProps | HeaderProps | DividerProps;

export const generateSandwichMenu = (
  { isLoggedIn, loginUrl = null, headerLinks }: GenerateSandwichMenuArgs,
): ListItem[] => {
  const unFlattenedMenuItems = headerLinks.map((item: HeaderLinksProps) => {
    if (item?.items) {
      return [
        { type: 'divider' },
        { type: 'header', text: item.label } as ListItem
      ]
        .concat(item.items)
        .concat([{ type: 'divider' }])
    }
    return mapHeaderItemToListMenuItem(item)
  })

  let menuItems = removeUnneededDividers(flatten(unFlattenedMenuItems));
  
  if (isLoggedIn) return menuItems;

  const loginItem: ListItem = {
    type: "item",
    text: "Log In",
    link: { url: loginUrl },
    itemId: "__LOGIN_ITEM_ID__",
  };

  return addLoginToMenuItems(menuItems, loginItem);
};

const flatten = (arr: any[]): ListItem[] => {
  return [].concat.apply([], arr);
}

const addLoginToMenuItems = (
  menuItems: ListItem[],
  loginItem: ListItem
): ListItem[] => {
  if (menuItems.length === 0) return [loginItem];
  return menuItems.concat([{ type: "divider" }, loginItem]);
};

export const mapHeaderItemToListMenuItem = ({ 
  label,
  link,
  isActiveRoute = false,
  newTab,
}: HeaderLinksProps): ItemProps => ({
  type: "item",
  itemId: label + link,
  text: label,
  link: { url: link, newTab },
  active: isActiveRoute,
})


const removeUnneededDividers = (list: ListItem[]) => {
  let indexesToRemove: number[] = [];
  let lastItemType = '';

  list.forEach((item, index) => {
    if (item.type === 'divider') {
      if (index === 0)
        indexesToRemove.push(0);
    
      if (lastItemType === 'divider')
        indexesToRemove.push(index);
    
      if (index === list.length - 1)
        indexesToRemove.push(index);
    }
  })

  return list.filter((_, index) => !indexesToRemove.includes(index));
}
