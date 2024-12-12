import { getRoundData } from '../../../api';
import styles from './page.module.css';

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Deaths({ params: { roundId } }: any) {
  const { deaths } = await getRoundData(roundId);
  return (
    <>
      <table className={styles.death}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Time</th>
            <th>Damage</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {deaths.map((death: any) => {
            const timeOfDeath = new Date(death.tod);
            return (
              <tr key={death.id}>
                <td>{death.name}</td>
                <td>{death.pod}</td>
                <td>
                  {('0' + timeOfDeath.getHours()).slice(-2)}:
                  {('0' + timeOfDeath.getMinutes()).slice(-2)}:
                  {('0' + timeOfDeath.getSeconds()).slice(-2)}
                </td>
                <td>
                  <div>{death.bruteloss} bruteloss</div>
                  <div>{death.fireloss} fireloss</div>
                  <div>{death.toxloss} toxloss</div>
                  <div>{death.oxyloss} oxyloss</div>
                </td>
                <td>
                  {death.x_coord}, {death.y_coord}, {death.z_coord}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
