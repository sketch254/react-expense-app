import { useId, forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(
    function Input(
        {
            type = "text",
            name,
            value,
            onChange,
            label,
            placeholder,
            error, 
            required = false,
            ...rest
        }, 
        ref
    ){

        const id = useId()
        const errorId = `${id}-error`

        return(
            <div>
                {label  && (
                    <label htmlFor={id} className="input-field__label">
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                    </label>
                )}
                <input 
                    id={id}
                    type={type} 
                    ref={ref}
                    onChange={onChange}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={
                        `input-field__input${error ? " input-field__input--error" : ""}`
                    }
                    {...rest}
                />
                {error && <p id={errorId} role="alert" className="input-field__error">{error}</p>}
            </div>
        )
    }
)

export default Input;

