import { useNavigate } from "react-router-dom";
import { Playlist } from "../../interfaces/playlist.types"
import PlaylistDetailsButton from "../PlaylistDetailsButton/PlaylistDetailsButton";

import styles from "./PlaylistDetailsHeader.module.scss";

interface PlaylistDetailsHeaderProps {
    playlist: Playlist
}

const PlaylistDetailsHeader: React.FC<PlaylistDetailsHeaderProps> = ({ playlist }) => {
    const navigate = useNavigate();
    return <div className={styles["playlist-header"]}>
        <img className={styles["playlist-image"]} src={playlist.image} alt={`Imagem da playlist ${playlist.name}`} />
        <div className={styles["playlist-info"]}>
            <div className={styles.top}>
                <h3>{playlist.name}</h3>
                <p>Detalhes da playlist</p>
            </div>
            <div className={styles.bottom}>
                <p onClick={() => navigate(`/profile/${playlist.author}`)}>Criado por {playlist.authorName}</p>
                <PlaylistDetailsButton playlist={playlist} />
            </div> 
        </div>
    </div>
}

export default PlaylistDetailsHeader;