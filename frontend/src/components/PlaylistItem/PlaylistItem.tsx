import { useNavigate } from 'react-router-dom';
import styles from './PlaylistItem.module.scss'

interface PlaylistItemProps {
    id: string;
    name: string;
    image: string;
    createdAt: Date | string;
};

function PlaylistItem({ id, image, name, createdAt }: PlaylistItemProps) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/playlist/${id}`)} className={styles['playlist-item']}>
            <div className={styles['playlist-image']} style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}/>
            <p className={styles['playlist-tittle']}>{name}</p>
            <p className={styles['playlist-creation-date']}>{createdAt?.toString()}</p>
        </div>
    );
}

export default PlaylistItem;