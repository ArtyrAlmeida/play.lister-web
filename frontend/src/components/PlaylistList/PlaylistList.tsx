import { Playlist } from "../../interfaces/playlist.types";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import NoContent from "../NoContent/NoContent";
import { Warning } from "@mui/icons-material";
import styles from './PlaylistList.module.scss'
import { Grid2 } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { NavLink } from "react-router-dom";

interface PlaylistListProps {
    playlists: Playlist[];
    listTittle: string;
    playlistRouting: string;
}

function PlaylistList({ playlists, listTittle, playlistRouting }: PlaylistListProps) {

    const { width } = useWindowDimensions();
    let playlistItems = playlists.slice(0,5);
    if(width > 1200) {
        playlistItems = playlists.slice(0,5);
    }
    else if(width > 900) {
        playlistItems =  playlists.slice(0,4)
    }
    else if(width > 600) {
        playlistItems =  playlists.slice(0,3)
    }else if (width > 0) {
        playlistItems =  playlists.slice(0,2)
    }

    const itemSize = 3.5;

    return (
        <div className={styles['playlist-list']}>
            <div className={styles['playlist-item-header']}>
                <h2 className={styles['playlist-tittle']}>{listTittle}</h2>
                {playlistRouting != "" && <NavLink to={playlistRouting} className={styles['playlist-item-action']} >Ver todas</NavLink>}
            </div>
            {(playlists.length > 0) ? 
            <div className={styles['grid-layout-wrapper']}>
                <Grid2 container spacing={1} columns={{ xs: (itemSize * 2), sm: (itemSize * 3), md: (itemSize * 4), lg: (itemSize * 5) }}>
                    {playlistItems.map((playlist) => (
                        <Grid2 key={playlist.name} display="flex" justifyContent="center" alignItems="center" size={itemSize}>
                            <PlaylistItem createdAt={playlist.createdAt || ''} image={playlist.image} name={playlist.name} />
                        </Grid2>
                    ))}
                </Grid2>
            </div>
            : <div className={styles['no-content-wrapper']}>
                <NoContent icon={<Warning />} message="Nenhuma playlist encontrada" />
            </div>}
        </div>
    );
}

export default PlaylistList;