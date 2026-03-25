import styles from './button.module.css';
import Link from 'next/link';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  title?: string;
  container?: boolean;
  Icon?: React.ElementType | null;
  variant?: 'default' | 'hollow' | 'text';
  color?: 'primary' | 'danger' | 'secondary';
  size?: 'default' | 'small' | 'large';
  href?: string;
};

const variantClasses: Record<string, string> = {
  hollow: styles.btnHollow,
  text: styles.btnText,
};

const colorClasses: Record<string, string> = {
  danger: styles.btnDanger,
  secondary: styles.btnSecondary,
};

const sizeClasses: Record<string, string> = {
  small: styles.small,
  large: styles.large,
};

export default function Button({
  children,
  onClick = () => {},
  className = '',
  disabled = false,
  title = '',
  container = false,
  Icon = null,
  variant = 'default',
  color = 'primary',
  size = 'default',
  href = ''
}: ButtonProps) {
  const variantClass = variantClasses[variant] ?? '';
  const colorClass = colorClasses[color] ?? '';
  const sizeClass = sizeClasses[size] ?? '';

  const fullClassName = `${styles.btn} ${variantClass} ${colorClass} ${sizeClass} ${className}`;

  const renderElement = () => {
    if (href) {
      return (
        <Link 
          href={href} 
          className={fullClassName} 
          title={title}
        >
          {Icon && <Icon size={16} />}
          {children && (<span className={styles.label}>{children}</span>)}
        </Link>
      );
    }

    return (
      <button
        className={fullClassName}
        onClick={onClick}
        disabled={disabled}
        title={title}
      >
        {Icon && <Icon size={16} />}
        {children && (<span className={styles.label}>{children}</span>)}
      </button>
    );
  };

  const content = renderElement();

  return (
    <>
      {container ? (
        <div className={`button-container ${className}`}>{content}</div>
      ) : (
        content
      )}
    </>
  );
}