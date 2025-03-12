import { useQuery } from "@tanstack/react-query";
import { getSong } from "../../api/songs/getSong";

import styles from "./SongItem.module.scss";

import Trash from "../../assets/images/Trash.svg"
import Loading from "../Loading/Loading";
import NoContent from "../NoContent/NoContent";
import { Close } from "@mui/icons-material";

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

    if (isLoading) return <Loading message="Carregando playlist"/>
    if (error || (!isLoading && !data)) return <NoContent icon={<Close />} message="Erro ao obter música"  />

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