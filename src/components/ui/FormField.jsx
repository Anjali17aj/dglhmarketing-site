import { useId } from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helper,
  required = false,
  autoComplete,
  rows,
  placeholder,
}) {
  const id = useId();
  const fieldId = `${name}-${id}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;
  const hasError = Boolean(error);
  const showHelper = Boolean(helper) && !hasError;
  const describedBy = [
    hasError ? errorId : null,
    showHelper ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;
  const isTextarea = type === 'textarea';
  const InputTag = isTextarea ? 'textarea' : 'input';

  return (
    <div
      className={`form-field${hasError ? ' form-field--error' : ''}${value && !hasError ? ' form-field--filled' : ''}`}
    >
      <label htmlFor={fieldId}>
        {label}
        {required && (
          <>
            <span className="form-field__required" aria-hidden="true"> *</span>
            <span className="visually-hidden"> (required)</span>
          </>
        )}
      </label>

      {showHelper && (
        <p id={helperId} className="form-field__helper">
          {helper}
        </p>
      )}

      <div className="form-field__control">
        <InputTag
          id={fieldId}
          name={name}
          type={isTextarea ? undefined : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-required={required || undefined}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-errormessage={hasError ? errorId : undefined}
        />
      </div>

      {hasError && (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
