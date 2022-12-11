import React, { memo } from "react";
import baseStyles from "./button.module.scss";
import { Icon, StandardProps } from "../cgui-core.atoms.icon";
import { Label } from "../cgui-core.atoms.typography";

export type Icon =
  | (StandardProps & { type: "solid" })
  | (StandardProps & { type: "line" });

export type ButtonEmphasis =
  | "primary"
  | "secondary"
  | "primary-inverse"
  | "secondary-inverse"
  | "secondary-alt"
  | "negative";

export type ButtonVariation = "solid" | "outline" | "text";
export type ButtonSize = "xsmall" | "small" | "default" | "large" | "xlarge";
export type ButtonType = "button" | "link";

export type ButtonProps = {
  /**
   * Determines whether the underlying implementation is an anchor tag or a
   * button tag.
   */
  buttonType?: ButtonType;
  /**
   * Determines the style of the button.
   */
  emphasis?: ButtonEmphasis;
  /**
   * Determines the fill of the button.
   */
  variation?: ButtonVariation;
  /**
   * Controls the size of the button.
   */
  size?: ButtonSize;
  /**
   * Floating buttons will have a 3D effect caused by a drop shadow added to
   * the button.
   */
  floating?: boolean;
  /**
   * Determines whether or not the button can be interacted with by the user.
   * This also overrides the styling.
   */
  disabled?: boolean;
  /**
   *
   */
  theme?: { readonly [key: string]: string };
  /**
   * Allows you to add an icon to the button. See the Icon atom for the
   * available icons. If no text is provided to an icon button, the button will
   * contain the icon in a perfect circle.
   */
  icon?: Icon;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ActionButtonProps = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LinkButtonProps = ButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ButtonContent = ({ icon, size, styles, children }) => (
  <>
    {icon?.type === "solid" && (
      <Icon.Solid
        className={`${styles.icon}`}
        name={icon.name}
        data-size={size}
      />
    )}
    {icon?.type === "line" && (
      <Icon.Line
        className={`${styles.icon}`}
        name={icon.name}
        data-size={size}
      />
    )}
    {children && (
      <Label className={`${styles.content}`} size={size}>
        {children}
      </Label>
    )}
  </>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = "button",
      emphasis = "primary",
      variation = "solid",
      size = "default",
      floating = false,
      disabled = false,
      icon,
      theme,
      ...props
    }: ButtonProps,
    ref
  ) =>
    buttonType === "link" ? (
      <LinkButton
        emphasis={emphasis}
        variation={variation}
        size={size}
        floating={floating}
        disabled={disabled}
        icon={icon}
        theme={theme}
        {...props}
      >
        {props.children}
      </LinkButton>
    ) : (
      <ActionButton
        emphasis={emphasis}
        variation={variation}
        size={size}
        floating={floating}
        disabled={disabled}
        icon={icon}
        theme={theme}
        ref={ref}
        {...props}
      >
        {props.children}
      </ActionButton>
    )
);

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ ...props }: ActionButtonProps, ref) => {
    const styles = props.theme || baseStyles;

    return (
      <button
        className={`${styles.button} ${props.className}`}
        data-size={props.size}
        data-variation={props.variation}
        data-emphasis={props.emphasis}
        data-disabled={props.disabled}
        disabled={props.disabled}
        data-floating={props.floating}
        data-icon={!!props.icon}
        data-children={!!props.children}
        style={styles}
        ref={ref}
        {...props}
      >
        <ButtonContent icon={props.icon} size={props.size} styles={styles}>
          {props.children}
        </ButtonContent>
      </button>
    );
  }
);

const LinkButton = ({ ...props }: LinkButtonProps) => {
  const styles = props.theme || baseStyles;
  const buttonStyle = !props.disabled
    ? {}
    : ({ pointerEvents: "none" } as const);

  return (
    <a
      className={`${styles.button} ${props.className}`}
      data-size={props.size}
      href={props.href}
      data-disabled={props.disabled}
      data-variation={props.variation}
      data-emphasis={props.emphasis}
      data-floating={props.floating}
      data-icon={!!props.icon}
      data-children={!!props.children}
      style={{ ...props.style, ...buttonStyle }}
      {...props}
    >
      <ButtonContent icon={props.icon} size={props.size} styles={styles}>
        {props.children}
      </ButtonContent>
    </a>
  );
};

export default memo(Button);
