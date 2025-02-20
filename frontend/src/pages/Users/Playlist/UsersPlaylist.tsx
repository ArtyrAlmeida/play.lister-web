import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import PlaylistList from "../../../components/PlaylistList/PlaylistList";

function UsersPlaylist() {
    return ( 
        <div>
            <h1><ArrowCircleLeftOutlined/> Suas Playlists</h1>
            <PlaylistList listTittle="Playlists Públicas" playlists={[]} />
            <PlaylistList listTittle="Playlists Privadas" playlists={[]} />
            <PlaylistList listTittle="Playlists Curtidas" playlists={[]} />
        </div>
     );
}

export default UsersPlaylist;