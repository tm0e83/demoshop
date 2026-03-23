import styles from './stepper-input.module.css';
import { Minus, Plus } from 'lucide-react';
import BaseInput from '../base-input';
import Button from '@/components/button';

type StepperInputProps = {
  value: number;
  onChange: (newValue: number) => void;
};

export default function StepperInput({ value, onChange }: StepperInputProps) {
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    } else {
      onChange(1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    } else {
      onChange(1);
    }
  };

  return (
    <div className={styles.stepperInput}>
      <Button variant="hollow" onClick={handleDecrement} className="stepper-button">
        <Minus size={16} />
      </Button>
      <BaseInput
        type="number"
        value={value}
        onChange={handleInputChange}
        className={styles.stepperInputField}
      />
      <Button variant="hollow" onClick={handleIncrement} className="stepper-button">
        <Plus size={16} />
      </Button>
    </div>
  );
};

