import { Playlist } from '../../interfaces/playlist.types';
import styles from './PlaylistItem.module.scss'

type PlaylistItemProps = Playlist;

function PlaylistItem({ imageUrl, tittle, creationDate }: PlaylistItemProps) {
    return (
        <div className={styles['playlist-item']}>
            <img className={styles['playlist-image']} src={imageUrl} alt="playlist image" />
            <p className={styles['playlist-tittle']}>{tittle}</p>
            <p className={styles['playlist-creation-date']}>{creationDate}</p>
        </div>
    );
}

export default PlaylistItem;