import { forwardRef } from "react";
import "./Button.css";

const VARIANT_CLASS = { 
    primary: "btn--primary", 
    secondary: "btn--secondary", 
    danger: "btn--danger" 
};

const Button = forwardRef(
    function Button(
        { 
            children, 
            type = "button", 
            variant = "primary", 
            disabled = false, 
            onClick, 
            ...rest 
        },
        ref
        ) {

            const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.primary;

            return (
                <button 
                    ref={ref} 
                    type={type} 
                    disabled={disabled} 
                    onClick={onClick} 
                    className={`btn ${variantClass}`} 
                    {...rest}
                >
                    {children}
                </button>
            );
        });

export default Button;
