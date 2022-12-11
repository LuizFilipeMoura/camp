import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Chip, ChipProps } from "../cgui-core.atoms.chip";
import { Icon } from "../cgui-core.atoms.icon";
import { Paragraph } from "../cgui-core.atoms.typography";
import {
  ListMenu,
  ListMenuProps,
} from "../cgui-core.molecules.list-menu";
import { ListItemProps } from "../cgui-core.atoms.list-item";
import typographyStyles from "../cgui-core.atoms.typography/typography.module.scss";
import baseStyles from "./select.module.scss";

export type SelectedRecord = {
  itemId: string;
} & ChipProps;

type ChipAppearance = {
  emphasis: ChipProps["emphasis"];
  type: ChipProps["type"];
};

export type SelectProps = {
  chipAppearance?: ChipAppearance;
  disabled?: boolean;
  initialValue?: SelectedRecord[];
  invalid?: boolean;
  name: string;
  onChangeSelectedRecords?: (selectedRecords: SelectedRecord[]) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  recordsHeight?: string;
  searchRecords?: ListMenuProps["items"];
  shouldFilterRecords?: boolean;
  size?: "default";
  theme?: { readonly [key: string]: string };
} & React.HTMLAttributes<HTMLDivElement>;

const Select = ({
  className = "",
  size = "default",
  invalid = false,
  disabled = false,
  placeholder,
  searchRecords = [],
  onInputChange,
  initialValue = [],
  shouldFilterRecords = true,
  recordsHeight = "initial",
  chipAppearance,
  onChangeSelectedRecords = () => {},
  theme,
  ...props
}: SelectProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [isOverflowingNotExtended, setIsOverflowingNotExtended] =
    useState<boolean>(false);
  const [listItemsToShow, setListItemsToShow] =
    useState<ListMenuProps["items"]>(searchRecords);
  const [selectedRecords, setSelectedRecords] =
    useState<SelectedRecord[]>(initialValue);
  const [selectedRecordsIds, setSelectedRecordsIds] = useState<Set<string>>(
    new Set()
  );
  const [shouldShowListMenu, setShouldShowListMenu] = useState<boolean>(false);

  const contentRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const listMenuRef = useRef<HTMLDivElement>(null);

  const maxHeightInPxWhenNotExtended = 75;

  const formatClickableMenuItem = (
    record: ListItemProps & { type: "item" }
  ) => {
    return {
      ...record,
      handleClick: () => {
        setInputValue("");
        handleChipAddition(record);
      },
    };
  };

  const handleChipAddition = (listItemToAdd: ListItemProps) => {
    const chipProps: ChipProps = {
      children: listItemToAdd.text,
    };
    if (!!listItemToAdd.icon) {
      chipProps["icon"] = { ...listItemToAdd.icon };
    } else if (!!listItemToAdd.avatar) {
      chipProps["avatar"] = { imageSrc: listItemToAdd.avatar.src };
    }
    const newRecord: SelectedRecord = {
      itemId: listItemToAdd.itemId,
      ...chipProps,
    };
    const newSelectedRecords = [...selectedRecords, newRecord];
    setSelectedRecords(newSelectedRecords);
  };

  const handleChipRemove = (idToRemove: string) => {
    const newSelectedRecords = selectedRecords.filter(
      (record) => record.itemId !== idToRemove
    );
    setSelectedRecords(newSelectedRecords);
    setInputValue("");
  };

  const handleClear = () => {
    setSelectedRecords([]);
    setInputValue("");
  };

  useEffect(() => {
    onChangeSelectedRecords(selectedRecords);
  }, [selectedRecords]);

  const handleFocus = () => {
    inputRef.current.focus();
    innerDivRef.current.scrollTop = innerDivRef.current.scrollHeight;
  };

  const handleInputBlur = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let newSearchRecords = searchRecords.filter(
      (item) => item.type !== "item" || !selectedRecordsIds.has(item.itemId)
    );
    if (shouldFilterRecords) {
      newSearchRecords = newSearchRecords.filter(
        (item) =>
          item.type !== "item" ||
          item.text.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    if (newSearchRecords.length === 0) {
      const noRecordsFoundItem: ListMenuProps["items"] = [
        {
          type: "item",
          itemId: "0",
          text: "No results found",
          active: false,
          disablePointer: true,
          ...props,
        },
      ];
      newSearchRecords.push(noRecordsFoundItem[0]);
    }
    setListItemsToShow(newSearchRecords);
  }, [inputValue]);

  useEffect(() => {
    setShouldShowListMenu(isActive && !!inputValue);
  }, [inputValue, isActive]);

  useEffect(() => {
    if (!!inputRef.current) {
      if (
        maxHeightInPxWhenNotExtended -
          inputRef.current.offsetTop -
          inputRef.current.offsetHeight <
        0
      ) {
        setIsOverflowingNotExtended(true);
      } else {
        setIsOverflowingNotExtended(false);
        setIsExtended(false);
      }
    }
  }, [inputValue, selectedRecords]);

  useEffect(() => {
    handleFocus();
  }, [inputValue, selectedRecords, isExtended]);

  useEffect(() => {
    setSelectedRecordsIds(
      new Set(selectedRecords.map((record) => record.itemId))
    );
  }, [selectedRecords]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as HTMLElement)
      ) {
        handleInputBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contentRef]);

  const areSelectedRecords = selectedRecords.length > 0;

  const styles = theme || baseStyles;

  return (
    <div
      ref={contentRef}
      className={classNames(styles.content, className)}
      {...props}
    >
      <div
        className={classNames(styles.outsideWrapper, {
          [styles.active]: isActive,
          [styles.extended]: isExtended,
        })}
        data-invalid={invalid}
        data-disabled={disabled}
        onClick={handleFocus}
        style={
          isExtended ? {} : { maxHeight: `${maxHeightInPxWhenNotExtended}px` }
        }
      >
        <div
          ref={innerDivRef}
          className={classNames(styles.innerWrapper, {
            [styles.noRecords]: !areSelectedRecords,
          })}
        >
          {selectedRecords.map((record) => {
            const { itemId, ...rest } = record;
            return (
              <Chip
                key={itemId}
                {...rest}
                {...chipAppearance}
                onRemove={() => handleChipRemove(itemId)}
                removeIcon
              />
            );
          })}
          {!!placeholder && !inputValue && !areSelectedRecords && (
            <Paragraph
              weight="book"
              size="small"
              className={styles.placeholder}
            >
              {placeholder}
            </Paragraph>
          )}
          <div
            className={classNames(styles.wrapper, typographyStyles.paragraph)}
            data-value={inputValue}
            data-size="small"
          >
            <input
              className={classNames(styles.input)}
              ref={inputRef}
              value={inputValue}
              onFocus={() => setIsActive(true)}
              onChange={(e) => {
                setInputValue(e.target.value);
                !!onInputChange && onInputChange(e.target.value);
              }}
            />
          </div>
          <div className={styles.controls}>
            {!isExtended && isOverflowingNotExtended && (
              <Paragraph
                size="xsmall"
                className={styles.showText}
                onClick={() => setIsExtended(true)}
              >
                Show all
              </Paragraph>
            )}
            {isExtended && (
              <Paragraph
                size="xsmall"
                className={styles.showText}
                onClick={() => setIsExtended(false)}
              >
                Show less
              </Paragraph>
            )}
            {areSelectedRecords && (
              <button className={styles.clearBtn} onClick={handleClear}>
                <Icon.Monochrome
                  name="times-circle"
                  className={styles.clearIcon}
                />
              </button>
            )}
          </div>
        </div>
        <input
          name={props.name}
          id={props.id}
          value={selectedRecords.map((record) => record.itemId)}
          readOnly
          hidden
        />
      </div>
      {shouldShowListMenu && (
        <ListMenu
          ref={listMenuRef}
          selection="multi"
          initialActiveIds={selectedRecordsIds}
          className={styles.menu}
          style={{ height: recordsHeight }}
          items={listItemsToShow.map((record) =>
            record.type === "item" ? formatClickableMenuItem(record) : record
          )}
        />
      )}
    </div>
  );
};

export default Select;
