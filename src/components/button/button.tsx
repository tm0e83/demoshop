import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  container?: boolean;
  variant?: 'default' | 'hollow' | 'text';
  color?: 'primary' | 'danger' | 'secondary';
  size?: 'default' | 'small' | 'large'
};

const variantClasses: Record<string, string> = {
  hollow: styles.btnHollow,
  text: styles.btnText,
};

const colorClasses: Record<string, string> = {
  danger: styles.btnDanger,
  secondary: styles.btnSecondary,
}

const sizeClasses: Record<string, string> = {
  small: styles.small,
  large: styles.large,
}

export default function Button({
  children,
  onClick = () => {},
  className = '',
  disabled = false,
  container = false,
  variant = 'default',
  color = 'primary',
  size = 'default',
}: ButtonProps) {
  const variantClass = variantClasses[variant] ?? '';
  const colorClass = colorClasses[color] ?? '';
  const sizeClass = sizeClasses[size] ?? '';

  const buttonTemplate = (
    <button
      className={`${styles.btn} ${variantClass} ${colorClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
  return (
    <>
      {container
        ? <div className={`button-container ${className}`}>{buttonTemplate}</div>
        : buttonTemplate}
    </>
  );
};

