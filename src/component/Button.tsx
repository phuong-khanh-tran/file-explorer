import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

const Button: FC<IButtonProps> = (props) => {
    const { disabled, children, className, variant = "primary", ...rest } = props;
    return (
        <button
            className={classNames(
                "rounded-xs border px-2 py-0.5 text-base transition-colors",
                {
                    // Primary variant
                    "bg-blue-800 text-white border-blue-800 cursor-pointer hover:bg-blue-900":
                        !disabled && variant === "primary",

                    // Secondary variant
                    "bg-white text-blue-800 border-blue-800 cursor-pointer hover:bg-blue-800 hover:text-white":
                        !disabled && variant === "secondary",

                    // Disabled state
                    "text-gray-400 cursor-not-allowed border-gray-400 bg-white": disabled,
                },
                className
            )}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
