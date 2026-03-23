import styles from './multi-select.module.css';

import { useId } from 'react';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  optionData: Option[];
  onChange?: (selectedOptions: string[]) => void;
  selectedOptions?: string[];
  label?: string;
};

export default function MultiSelect({
  optionData,
  onChange,
  selectedOptions = [],
  label
}: MultiSelectProps) {
  const id = useId();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (!onChange) {
      return;
    }

    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <>
      <div className={styles.multiSelect}>
        {label && <div>{ label }</div>}
        <div className={styles.multiSelectOptions}>
          {optionData.map((option, index) => (
            <div key={option.value} className={styles.multiSelectOption}>
              <input
                type="checkbox"
                id={`${id}-${index}`}
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`${id}-${index}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
