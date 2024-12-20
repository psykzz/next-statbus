import Link from 'next/link';
import styles from './page.module.css';
import { getStatbusData, getRoundData } from '../../api';

const PLAY_LINK = 'byond://tgmc.tgstation13.org:5337';
const DISCORD_LINK = 'https://discord.gg/2dFpfNE';

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function RoundLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, any>>;
}) {
  const { summary } = await getStatbusData();
  const { roundId } = await params;
  const { game_mode, game_mode_result, map_name, ship_name, deaths } =
    await getRoundData(roundId);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          TGMC Statbus - Serving{' '}
          <b>{summary.stats.players.toLocaleString()} rounds</b>.
        </h1>

        <p className={styles.description}>
          <Link href={PLAY_LINK} target="_blank" rel="noopener noreferrer">
            Play Now
          </Link>
          <Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            Discord
          </Link>
          <Link
            href="https://tgstation13.org/wiki/TGMC"
            rel="noopener noreferrer">
            Wiki
          </Link>
        </p>
        <h2 className={styles.breadcrumbs}>
          <Link href="/">&larr;</Link>
          <span># {roundId}</span>
        </h2>

        <div className={styles.roundDataRow}>
          <div className={styles.roundData}>
            <b>Map:</b> {map_name}
          </div>
          <div className={styles.roundData}>
            <b>Ship:</b> {ship_name}
          </div>
          <div className={styles.roundData}>
            <b>Game Mode:</b> {game_mode}
          </div>
          <div className={styles.roundData}>
            <b>Result:</b> {game_mode_result}
          </div>
        </div>

        <div className={styles.subnav}>
          <a href={`/round/${roundId}/death`} className={styles.subnav_item}>
            Deaths
          </a>
          <a href={`/round/${roundId}/pr`} className={styles.subnav_item}>
            Testmerged PRs
          </a>
          <a href={`/round/${roundId}/stats`} className={styles.subnav_item}>
            Stats
          </a>
        </div>

        {children}
      </main>
    </div>
  );
}
