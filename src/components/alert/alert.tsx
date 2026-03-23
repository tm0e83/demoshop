import styles from './alert.module.css';

type AlertProps = {
  /** The content to be displayed inside the alert */
  children: React.ReactNode;

  /** Additional CSS classes for the alert component */
  className?: string;

  /** The type of alert, which determines its styling */
  type?: 'success' | 'danger' | 'warning' | 'info';
};

const typeClasses: Record<string, string> = {
  info: styles.alertInfo,
  danger: styles.alertDanger,
  success: styles.alertSuccess,
  warning: styles.alertWarning,
};

export default function Alert({ children, className = '', type = 'info' }: AlertProps) {
  return <div className={`${styles.alert} ${typeClasses[type] ?? ''} ${className}`}>{children}</div>;
};

