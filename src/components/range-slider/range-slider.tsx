'use client';

import styles from './range-slider.module.css';
import { useState } from 'react';

type RangeSliderProps = {
  id: string;
  min: number;
  max: number;
  step?: number;
  onChange: (min: number, max: number) => void;
};

export default function RangeSlider({ id, min, max, step = 1, onChange }: RangeSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= maxValue) {
      setMinValue(newValue);
      onChange(newValue, maxValue);
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= minValue) {
      setMaxValue(newValue);
      onChange(minValue, newValue);
    }
  };

  return (
    <>
      <div className={styles.rangeSlider}>
        <div className={styles.slider}>
          <div className={styles.track}></div>
          <input type="range" id={`minRange-${id}`} min={min} max={max} step={step} value={minValue} onChange={handleMinChange} />
          <input type="range" id={`maxRange-${id}`} min={min} max={max} step={step} value={maxValue} onChange={handleMaxChange} />
        </div>
        <div className={styles.rangeValues}>
          <div className={styles.rangeValue}>
            <input type="number" id={`minInput-${id}`} min={min} max={max} step={step} value={minValue} onChange={handleMinChange} />
          </div>
          <span>-</span>
          <div className={styles.rangeValue}>
            <input type="number" id={`maxInput-${id}`} min={min} max={max} step={step} value={maxValue} onChange={handleMaxChange} />
          </div>
        </div>
      </div>
    </>
  );
};

