import styles from './input.module.css';
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import React from 'react';
import BaseInput from './base-input';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<FieldValues>;
  error?: string;
  label?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export default function Input({ label, error, ref, ...inputProps }: InputProps) {
  return (
    <>
      <div className={`${styles.input} ${error ? styles.isInvalid : ''}`}>
        {label && <label htmlFor={inputProps.id}>{label}</label>}
        <BaseInput {...inputProps} ref={ref} />
        {error && <span className={styles.fieldError}>{error}</span>}
      </div>
    </>
  );
}

