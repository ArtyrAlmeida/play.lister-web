import { useQuery } from "@tanstack/react-query";
import { getSong } from "../../api/songs/getSong";

import styles from "./SongItem.module.scss";

import Trash from "../../assets/images/Trash.svg"

type SongItemProps = {
    songId: string,
    isForm: false
} | {
    songId: string,
    isForm: true;
    onDeletion: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = (props) => {
    const songId = props.songId;
    const { data, isLoading, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: [`song-${songId}`, songId],
        queryFn: async () => {
            return await getSong(songId)
        }
    });

    if (isLoading) return <h1>Loading</h1>
    if (error || (!isLoading && !data)) return <h1>Error</h1>

    if (data) {
        return <div className={styles["song"]}>
            <img className={styles["song-image"]} src={data.image} alt={`Imagem da playlist ${data.name}`} />
            <div className={styles["song-info"]}>
                <div className={styles["top"]}>
                    <div>
                        <h3>{data.name}</h3>
                        <p>{data.author}</p>
                    </div>
                    { props.isForm && <img className={styles["trash"]} src={Trash} onClick={() => props.onDeletion(songId)} /> }
                </div>
                <div className={styles["bottom"]}>
                    <p>{data.length}</p>
                    <p>{data.genre}</p>
                </div>
            </div>
        </div>
    }
}

export default SongItem;