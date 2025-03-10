import { useQuery } from "@tanstack/react-query";
import { getSong } from "../../api/songs/getSong";

import styles from "./SongItem.module.scss";

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
        return <div>
            <img className={styles["song-image"]} src={data.image} alt={`Imagem da playlist ${data.name}`} />
            <div>
                <div>
                    <h3>{data.name}</h3>
                    <p>{data.author}</p>
                </div>
                <div>
                    <p>{data.length}</p>
                    <p>{data.genre}</p>
                </div>
            </div>
            { props.isForm && <button onClick={() => props.onDeletion(songId)}>Excluir</button> }
        </div>
    }
}

export default SongItem;