import styles from './skeleton.module.css';

export const SkeletonRound = () => (
    <a href='#' className={styles.card}>
        <h2><em style={{width:'6rem'}} /> &rarr;</h2>
        <p><em style={{width:'12rem'}} /> <em style={{width:'12rem'}} /> </p>
    </a>
);
