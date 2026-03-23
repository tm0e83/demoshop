import styles from './quantity-input.module.css';
import StepperInput from '../stepper-input';

type QuantityInputProps = {
  value: number;
  onChange: (newValue: number) => void;
};

export default function QuantityInput({ value, onChange }: QuantityInputProps) {
  return (
    <div className={styles.quantityInput}>
      <StepperInput value={value} onChange={onChange} />
    </div>
  );
};

