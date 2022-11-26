import { getRoundData, getStatbusData } from '../../../page';
import styles from './page.module.css';

const PLAY_LINK = 'byond://tgmc.tgstation13.org:5337';
const DISCORD_LINK = 'https://discord.gg/2dFpfNE';

export default async function Deaths({ params: { roundId } }: any) {
  const { summary } = await getStatbusData();
  const { deaths } = await getRoundData(roundId);
  return (
    <>
      <h3>Deaths</h3>
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
