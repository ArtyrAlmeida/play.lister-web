import { Playlist } from '../../interfaces/playlist.types';
import styles from './PlaylistItem.module.scss'

type PlaylistItemProps = Playlist;

function PlaylistItem({ image, name, createdAt }: PlaylistItemProps) {
    return (
        <div className={styles['playlist-item']}>
            <img className={styles['playlist-image']} src={image} alt="playlist image" />
            <p className={styles['playlist-tittle']}>{name}</p>
            <p className={styles['playlist-creation-date']}>{createdAt?.toString()}</p>
        </div>
    );
}

export default PlaylistItem;