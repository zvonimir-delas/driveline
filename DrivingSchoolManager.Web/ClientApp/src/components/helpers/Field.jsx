import React, { forwardRef } from "react";

const Field = forwardRef(
  (
    {
      component,
      type,
      name,
      error,
      placeholder,
      label,
      options,
      disabled,
      onChangeHandler,
    },
    ref
  ) => {
    return (
      <div className="form__field">
        <label htmlFor={name} className="form__label">
          {label}
        </label>
        {!component && (
          <input
            type={type}
            name={name}
            ref={ref}
            placeholder={placeholder}
            className="form__input"
            disabled={disabled && "disabled"}
            onChange={onChangeHandler ? () => onChangeHandler() : null}
          />
        )}

        {component === "select" && (
          <select
            type={type}
            name={name}
            ref={ref}
            className="form__select"
            disabled={disabled && "disabled"}
            onChange={onChangeHandler ? () => onChangeHandler() : null}>
            {options.map((value, index) => (
              <option key={index} value={value} className="form__option">
                {value}
              </option>
            ))}
          </select>
        )}

        {component === "textarea" && (
          <textarea
            type={type}
            name={name}
            ref={ref}
            placeholder={placeholder}
            className="form__input"
            disabled={disabled && "disabled"}
            onChange={onChangeHandler ? () => onChangeHandler() : null}
          />
        )}

        {error && <span className="form__error">{error.message}</span>}
      </div>
    );
  }
);

export default Field;
