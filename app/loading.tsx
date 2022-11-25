import Footer from '../components/Footer';
import { SkeletonRound } from '../components/SkeletonRound/skeleton';
import styles from './page.module.css';

const PLAY_LINK = 'byond://tgmc.tgstation13.org:5337';
const DISCORD_LINK = 'https://discord.gg/2dFpfNE';

export default async function LoadingHome() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          TGMC Statbus - Serving <b>a number of rounds</b>.
        </h1>

        <p className={styles.description}>
          <a href={PLAY_LINK} target="_blank" rel="noopener noreferrer">
            Play Now
          </a>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            Discord
          </a>
          <a href="https://tgstation13.org/wiki/TGMC" rel="noopener noreferrer">
            Wiki
          </a>
        </p>

        <h2 className={styles.subtitle}>Loading rounds</h2>

        <div className={styles.grid}>
          <SkeletonRound /> <SkeletonRound /> <SkeletonRound />
          <SkeletonRound />
          <SkeletonRound /> <SkeletonRound /> <SkeletonRound />
          <SkeletonRound />
          <SkeletonRound /> <SkeletonRound /> <SkeletonRound />
          <SkeletonRound />
        </div>
      </main>

      <Footer />
    </div>
  );
}
