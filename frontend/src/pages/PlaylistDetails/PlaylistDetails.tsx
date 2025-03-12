import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../../api/playlists/getPlaylist";
import { useParams } from "react-router-dom";
import PlaylistDetailsHeader from "../../components/PlaylistDetailsHeader/PlaylistDetailsHeader";
import SongItem from "../../components/SongItem/SongItem";

import styles from "./PlaylistDetails.module.scss";
import Loading from "../../components/Loading/Loading";
import NoContent from "../../components/NoContent/NoContent";
import { Close } from "@mui/icons-material";

const PlaylistDetails: React.FC = () => {
    const params = useParams();
    const playlistId = params.id as string;

    const { data, isLoading, error } = useQuery({
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        
        queryKey: [`playlist-${playlistId}`, playlistId, "playlist"],
        queryFn: async () => {
            return await getPlaylist(playlistId)
        }
    });

    if (isLoading) return <div><Loading message="Carregando Analytics"/></div>
    if (error || (!isLoading && !data)) return <NoContent icon={<Close />} message="Erro ao obter métricas"  />

    if (data) {
        return <div id={styles.background}>
            <PlaylistDetailsHeader playlist={data} />
            <div className={styles.list}>
                { data.songs && data.songs.map(song => <SongItem key={song} songId={song} isForm={false} />) }
            </div>
        </div>
    }
}

export default PlaylistDetails;