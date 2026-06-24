import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Alert from './alert';
import styles from './alert.module.css';

describe('Alert', () => {
  it('rendert die children', () => {
    render(<Alert>Hallo Welt</Alert>);
    expect(screen.getByText('Hallo Welt')).toBeInTheDocument();
  });

  it('verwendet "info" als Standard-Typ', () => {
    const { container } = render(<Alert>Test</Alert>);
    expect(container.firstChild).toHaveClass(styles.alertInfo);
  });
});