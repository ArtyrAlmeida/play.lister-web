import { useQuery } from "@tanstack/react-query";
import PlaylistForm from "../../components/PlaylistForm/PlaylistForm";
import { getPlaylist } from "../../api/playlists/getPlaylist";
import { useParams } from "react-router-dom";

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

    if (isLoading) {
        <h2>Loanding</h2>
    }

    if (error) {
        <h2>Erro</h2>
    }

    return <div>
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