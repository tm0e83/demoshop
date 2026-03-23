import styles from './sidebar.module.css';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className={styles.sidebar}>
      {children}
    </aside>
  );
};
