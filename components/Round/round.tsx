import styles from './round.module.css';

type RoundProps = {
    id: number;
    game_mode: string;
    game_mode_result: string;
    map_name: string;
    ship_name: string;

}
export const Round = ({id, game_mode_result, game_mode, map_name, ship_name}: RoundProps) => (
    <a href={`/round/${id}`} className={styles.card}>
        <h2>#{id} &rarr;</h2>
        <p>{game_mode_result} on {map_name} {ship_name!=="UNSET" && `(${ship_name})`}.</p>
    </a>
);
