import { getRoundData, getStatbusData } from '../../page';
import styles from './page.module.css';

const PLAY_LINK = 'byond://tgmc.tgstation13.org:5337';
const DISCORD_LINK = 'https://discord.gg/2dFpfNE';

export default async function RoundLayout({
  children,
  params: { roundId },
  ...rest
}: {
  children: React.ReactNode;
  params: Record<string, any>;
}) {
  const { summary } = await getStatbusData();
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
        <h2 className={styles.subtitle}>
          <a href="/">&larr;</a>
          <span># {roundId}</span>
        </h2>

        <p>
          <b>Map:</b> {map_name}
          <b>Ship:</b> {ship_name}
          <b>Game Mode:</b> {game_mode}
          <b>Result:</b> {game_mode_result}
          <b>Map:</b> {map_name}
        </p>

        <div className={styles.subnav}>
          <a href="/round/18045/death" className={styles.subnav_item}>
            Deaths
          </a>
          <a href="/round/18045/pr" className={styles.subnav_item}>
            Testmerged PRs
          </a>
          <a href="/round/18045/stats" className={styles.subnav_item}>
            Stats
          </a>
        </div>

        {children}
      </main>
    </div>
  );
}
