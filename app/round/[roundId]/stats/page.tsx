import { getRoundData } from '../../../page';
import styles from './page.module.css';

export default async function Deaths({ params: { roundId } }: any) {
  const { round_stats, ...rest } = await getRoundData(roundId);
  return (
    <>
      <table className={styles.death}>
        <thead>
          <tr>
            <th>Round stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(round_stats).map(([key, value], idx) => {
            return (
              <tr key={idx}>
                <td>{key.replaceAll('_', ' ')}</td>
                <td>{value as any}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
