import styles from './select.module.css';


type SelectProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  ref?: React.Ref<HTMLSelectElement>;
};

export default function Select({ label, options, error, ref, ...selectProps }: SelectProps) {
  return (
    <div className={`${styles.select} ${error ? styles.isInvalid : ''}`}>
      {label && <label htmlFor={selectProps.id}>{label}</label>}
      <select
        ref={ref}
        {...selectProps}
        {...(options.length === 0 ? { disabled: true } : {})}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}

