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

// Hinweis: Wenn sich `min`/`max` ändern (z. B. andere Kategorie mit anderer
// Preisspanne), muss die aufrufende Komponente `<RangeSlider key={id} .../>`
// mit einem entsprechend wechselnden `key` rendern, damit React die internen
// States per Remount zurücksetzt statt sie zu aktualisieren.
export default function RangeSlider({ id, min, max, step = 1, onChange }: RangeSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [minText, setMinText] = useState(String(min));
  const [maxText, setMaxText] = useState(String(max));

  const handleMinRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue <= maxValue) {
      setMinValue(newValue);
      setMinText(String(newValue));
      onChange(newValue, maxValue);
    }
  };

  const handleMaxRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= minValue) {
      setMaxValue(newValue);
      setMaxText(String(newValue));
      onChange(minValue, newValue);
    }
  };

  // Während des Tippens nur den Text übernehmen (erlaubt u. a. einen leeren Wert),
  // ohne ihn sofort zu validieren/zu committen.
  const handleMinTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinText(event.target.value);
  };

  const handleMaxTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxText(event.target.value);
  };

  const commitMinText = (rawValue: string) => {
    const parsed = Number(rawValue);
    const isValid = rawValue.trim() !== '' && !Number.isNaN(parsed);
    const clamped = isValid ? Math.min(Math.max(parsed, min), maxValue) : minValue;

    setMinValue(clamped);
    setMinText(String(clamped));
    onChange(clamped, maxValue);
  };

  const commitMaxText = (rawValue: string) => {
    const parsed = Number(rawValue);
    const isValid = rawValue.trim() !== '' && !Number.isNaN(parsed);
    const clamped = isValid ? Math.min(Math.max(parsed, minValue), max) : maxValue;

    setMaxValue(clamped);
    setMaxText(String(clamped));
    onChange(minValue, clamped);
  };

  // Erst beim Verlassen des Feldes wird der Wert geparst, geclampt und committet.
  const handleMinTextBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    commitMinText(event.target.value);
  };

  const handleMaxTextBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    commitMaxText(event.target.value);
  };

  const handleTextKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <div className={styles.rangeSlider}>
      <div className={styles.slider}>
        <div className={styles.track}></div>
        <input type="range" id={`minRange-${id}`} min={min} max={max} step={step} value={minValue} onChange={handleMinRangeChange} />
        <input type="range" id={`maxRange-${id}`} min={min} max={max} step={step} value={maxValue} onChange={handleMaxRangeChange} />
      </div>
      <div className={styles.rangeValues}>
        <div className={styles.rangeValue}>
          <input
            type="number"
            id={`minInput-${id}`}
            min={min}
            max={max}
            step={step}
            value={minText}
            onChange={handleMinTextChange}
            onBlur={handleMinTextBlur}
            onKeyDown={handleTextKeyDown}
          />
        </div>
        <span>-</span>
        <div className={styles.rangeValue}>
          <input
            type="number"
            id={`maxInput-${id}`}
            min={min}
            max={max}
            step={step}
            value={maxText}
            onChange={handleMaxTextChange}
            onBlur={handleMaxTextBlur}
            onKeyDown={handleTextKeyDown}
          />
        </div>
      </div>
    </div>
  );
};
