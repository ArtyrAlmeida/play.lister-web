import PlaylistList from "../../components/PlaylistList/PlaylistList";
import styles from './Home.module.scss';
import { useQueries } from "@tanstack/react-query";
import { getUserPlaylists } from "../../api/playlists/getUserPlaylists";
import { getLikedPlaylists } from "../../api/playlists/getLikedPlaylists";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../interfaces/auth.types";
import { getPlaylistsByMonth } from "../../api/playlists/getPlaylistsByMonth";


function UsersPlaylist() {    
    const { id: userId } = useAuthUser<AuthResponse>()!

    const results = useQueries({
        queries: [
          { queryKey: ['created-home', userId,'playlists', 'created'], queryFn: async () => (await getPlaylistsByMonth()).reverse(), refetchOnWindowFocus: true },
          { queryKey: ['liked-home', userId,'playlists', 'liked'], queryFn: async () => await getLikedPlaylists(userId), refetchOnWindowFocus: true },
          { queryKey: ['user-home', userId,'playlists', 'user'], queryFn: async () => await getUserPlaylists(userId), refetchOnWindowFocus: true },
        ],
    })

    const [newPlaylistsQuery, likedPlaylistsQuery, userPlaylistsQuery] = results;

    const newPlaylists = Array.isArray(newPlaylistsQuery.data) ? newPlaylistsQuery.data : [];
    const likedPlaylists = Array.isArray(likedPlaylistsQuery.data) ? likedPlaylistsQuery.data : [];
    const userPlaylists = Array.isArray(userPlaylistsQuery.data) ? userPlaylistsQuery.data : [];

    return ( 
        <div id={styles['playlists-wrapper']}>
            <PlaylistList playlistRouting="" listTittle="Playlists Novas" playlists={newPlaylists} />
            <PlaylistList playlistRouting="users/playlists/liked" listTittle="Playlists Curtidas" playlists={likedPlaylists} />
            <PlaylistList playlistRouting="users/playlists/created" listTittle="Suas playlists" playlists={userPlaylists} />
        </div>
     );
}

export default UsersPlaylist;