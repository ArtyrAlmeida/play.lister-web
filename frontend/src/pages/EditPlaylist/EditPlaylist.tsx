import { useQuery } from "@tanstack/react-query";
import PlaylistForm from "../../components/PlaylistForm/PlaylistForm";
import { getPlaylist } from "../../api/playlists/getPlaylist";
import { useParams } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../interfaces/auth.types";

import styles from "./EditPlaylist.module.scss";
import Loading from "../../components/Loading/Loading";
import NoContent from "../../components/NoContent/NoContent";
import { Close } from "@mui/icons-material";

const EditPlaylist: React.FC = () => {
    const params = useParams();
    const playlistId = params.id as string;

    
    const { data, isLoading, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: [`playlist-${playlistId}`, playlistId],
        queryFn: async () => {
            return await getPlaylist(playlistId)
        }
    });
    
    const user = useAuthUser<AuthResponse>();

    if (data && user?.id != data.author) {
        return <div><h1>Essa playlist não é sua</h1></div>
    }

    if (isLoading) return <div><Loading message="Carregando Playlist"/></div>
    if (error || (!isLoading && !data)) return <NoContent icon={<Close />} message="Erro ao obter playlist para edição"  />

    return <div id={styles.background}>
        { 
            data && 
            <PlaylistForm 
                mode="edit" 
                initialValues={{ 
                    _id: playlistId,
                    image: data.image,
                    name: data.name,
                    songs: data.songs,
                    usersLiked: data.usersLiked
                }} 
            /> 
        }
        
    </div>
}

export default EditPlaylist;