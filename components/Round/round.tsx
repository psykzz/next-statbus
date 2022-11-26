import { use } from 'react';
import { getRoundData } from '../../app/page';
import styles from './round.module.css';

export const Round = ({ roundId }: { roundId: any }) => {
  const data = use(getRoundData(roundId));
  const { game_mode_result, map_name, ship_name } = data;
  return (
    <a href={`/round/${roundId}`} className={styles.card}>
      <h2>
        #{roundId} <span className={styles.farRight}>&rarr;</span>
      </h2>
      <p>
        {game_mode_result} on {map_name}{' '}
        {ship_name !== 'UNSET' && `(${ship_name})`}.
      </p>
    </a>
  );
};
