import styles from './footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/psykzz/next-statbus">source</a> |
      <a href="https://psykzz.dev">made by psykzz</a>
    </footer>
  );
}
