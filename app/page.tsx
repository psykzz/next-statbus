import { Round } from '../components/Round/round';
import styles from './page.module.css';

const PLAY_LINK = 'byond://tgmc.tgstation13.org:5337';
const DISCORD_LINK = 'https://discord.gg/2dFpfNE';

export async function getStatbusData() {
  const summary = await(
    await fetch('https://statbus.psykzz.com/api/summary', {
      next: { revalidate: 60 },
    })
  ).json();
  const rounds = await Promise.all(
    summary.rounds.map(async (roundId: number) => {
      // const data = await getRoundData(roundId);
      return <Round key={roundId} roundId={roundId} />;
    })
  );
  return { summary, rounds };
}

export async function getRoundData(roundId: number) {
  const res = await fetch(`https://statbus.psykzz.com/api/round/${roundId}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    return {};
  }
  const data = await res.json();
  return data?.round ?? {};
}

export default async function Home() {
  const { summary, rounds } = await getStatbusData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          TGMC Statbus - Serving{' '}
          <b>{summary.stats.players.toLocaleString()} rounds</b>.
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

        <h2 className={styles.subtitle}>Latest rounds</h2>

        <div className={styles.grid}>{rounds}</div>
      </main>
    </div>
  );
}
