import styles from './PlaylistItem.module.scss'

interface PlaylistItemProps {
    name: string;
    image: string;
    createdAt: Date | string;
};

function PlaylistItem({ image, name, createdAt }: PlaylistItemProps) {
    return (
        <div className={styles['playlist-item']}>
            <div className={styles['playlist-image']} style={{
                backgroundImage: image,
                backgroundSize: 'cover'
            }}/>
            <p className={styles['playlist-tittle']}>{name}</p>
            <p className={styles['playlist-creation-date']}>{createdAt?.toString()}</p>
        </div>
    );
}

export default PlaylistItem;