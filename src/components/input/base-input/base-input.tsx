import styles from './base-input.module.css';
import type { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<FieldValues>;
  rules?: RegisterOptions<FieldValues>;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export default function BaseInput({ ref, ...inputProps }: BaseInputProps) {
  return (
    <input {...inputProps} ref={ref} className={`${styles.baseInput} ${inputProps.className || ''}`} />
  );
}

