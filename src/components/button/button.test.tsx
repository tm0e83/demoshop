import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

describe('Alert', () => {
  it('renders an icon on the left', () => {
    const { container } = render(<Button Icon={ArrowLeft} iconAlign="left">Button Text</Button>);
    const button = container.querySelector('button');
    const firstElement = button?.firstElementChild;
    expect(firstElement).toBeTruthy();
    expect(firstElement?.nodeName.toUpperCase()).toBe('SVG');
  });

  it('renders an icon on the right', () => {
    const { container } = render(<Button Icon={ArrowRight} iconAlign="right">Button Text</Button>);
    const button = container.querySelector('button');
    const lastElement = button?.lastElementChild;
    expect(lastElement).toBeTruthy();
    expect(lastElement?.nodeName.toUpperCase()).toBe('SVG');
  });

  it('renders the button within a container element', () => {
    const { container } = render(<Button container={true}>Button Text</Button>);
    const containerElement = container.firstElementChild;
    expect(containerElement).toBeTruthy();
  });

  it('renders a disabled button', () => {
    const { container } = render(<Button disabled>Button Text</Button>);
    const containerElement = container.querySelector('button');
    expect(containerElement).toHaveAttribute('disabled');
  });
});