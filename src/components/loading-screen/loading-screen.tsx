import styles from './loading-screen.module.css';
import Loader from '@/components/loader';

export default function LoadingScreen() {
  return (
    <div className={styles.loadingScreenPage}>
      <Loader />
    </div>
  );
};

