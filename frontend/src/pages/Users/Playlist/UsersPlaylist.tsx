import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import PlaylistList from "../../../components/PlaylistList/PlaylistList";
import styles from './UsersPlaylist.module.scss';
import { useQueries } from "@tanstack/react-query";
import { getUserPlaylists } from "../../../api/playlists/getUserPlaylists";
import { getLikedPlaylists } from "../../../api/playlists/getLikedPlaylists";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../../interfaces/auth.types";

function UsersPlaylist() {    
    const { id: userId } = useAuthUser<AuthResponse>()!

    const results = useQueries({
        queries: [
          { queryKey: ['user', userId,'playlists', 'created'], queryFn: async () => await getUserPlaylists(userId), staleTime: Infinity },
          { queryKey: ['user', userId,'playlists', 'liked'], queryFn: async () => await getLikedPlaylists(userId), staleTime: Infinity },
        ],
    })

    const [createdPlaylistsQuery, likedPlaylistsQuery] = results;

    const createdPlaylists = Array.isArray(createdPlaylistsQuery.data) ? createdPlaylistsQuery.data : [];
    const likedPlaylists = Array.isArray(likedPlaylistsQuery.data) ? likedPlaylistsQuery.data : [];

    return ( 
        <div id={styles['your-playlists-wrapper']}>
            <h1 id={styles['page-tittle']}><ArrowCircleLeftOutlined/> Suas Playlists</h1>
            <PlaylistList playlistRouting="created" listTittle="Playlists Públicas" playlists={createdPlaylists} />
            <PlaylistList playlistRouting="liked" listTittle="Playlists Curtidas" playlists={likedPlaylists} />
        </div>
     );
}

export default UsersPlaylist;