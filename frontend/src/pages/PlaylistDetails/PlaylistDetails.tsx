import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../../api/playlists/getPlaylist";
import { useParams } from "react-router-dom";
import PlaylistDetailsHeader from "../../components/PlaylistDetailsHeader/PlaylistDetailsHeader";
import SongItem from "../../components/SongItem/SongItem";

const PlaylistDetails: React.FC = () => {
    const params = useParams();
    const playlistId = params.id as string;

    const { data, isLoading, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: [`playlist-${playlistId}`, playlistId],
        queryFn: async () => {
            return await getPlaylist(playlistId)
        }
    });

    if (isLoading) return <h1>Loading</h1>
    if (error || (!isLoading && !data)) return <h1>Error</h1>

    if (data) {
        return <div>
            <PlaylistDetailsHeader playlist={data} />
            <div>
                { data.songs && data.songs.map(song => <SongItem key={song} songId={song} />) }
            </div>
        </div>
    }
}

export default PlaylistDetails;