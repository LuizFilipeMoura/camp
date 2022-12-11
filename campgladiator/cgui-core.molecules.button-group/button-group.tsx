import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon, StandardProps } from '../cgui-core.atoms.icon';
import { Label } from '../cgui-core.atoms.typography';
import styles from './button-group.module.scss';

export type Icon = (StandardProps & { type: 'solid' }) | (StandardProps & { type: 'line' });

export type ButtonGroupProps = {
  buttons: Array<ButtonsProps>;
  size?: 'xsmall' | 'small' | 'default' | 'large';
  defaultSelected?: number;
  className?: string;
  onSelect?: (index: number) => void;
  // Added this for the filter to work better
  forceSelected?: number;
} & ButtonsProps;

type ButtonsProps = {
  text?: string;
  icon?: Icon;
  disabled?: boolean;
};

const ButtonGroup = ({
  size = 'default',
  buttons = [],
  className = '',
  defaultSelected = 0,
  onSelect = () => {},
  forceSelected = 0,
  ...props
}: ButtonGroupProps) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(defaultSelected);
  const onClick = (index: number) => () => {
    setActiveButtonIndex(index);
    onSelect(index);
  };
  useEffect(() => {
    setActiveButtonIndex(forceSelected);
  }, [forceSelected]);

  return (
    <div className={classNames(styles.cgButtonGroup, className)} {...props}>
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            data-id={index}
            className={classNames(styles.cgButton, {
              [styles.cgButtonActive]: index === activeButtonIndex,
            })}
            data-size={size}
            disabled={button.disabled}
            onClick={onClick(index)}
            icon={button.icon}
            data-icon={button.icon ? true : false}
            data-children={button.text ? true : false}
            {...button}
          >
            {button.icon?.type === 'solid' && (
              <Icon.Solid className={`${styles.icon}`} name={button.icon.name} data-size={size} />
            )}
            {button.icon?.type === 'line' && (
              <Icon.Line className={`${styles.icon}`} name={button.icon.name} data-size={size} />
            )}
            {button.text && (
              <Label className={`${styles.content}`} size={size}>
                {button.text}
              </Label>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
