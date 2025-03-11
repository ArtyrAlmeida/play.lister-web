import { Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../../../interfaces/auth.types";
import { getUserPlaylists } from "../../../../api/playlists/getUserPlaylists";
import { getLikedPlaylists } from "../../../../api/playlists/getLikedPlaylists";
import { useLocation } from "react-router-dom";
import NoContent from "../../../../components/NoContent/NoContent";
import Loading from "../../../../components/Loading/Loading";
import styles from './PlaylistByType.module.scss'
import { Warning } from "@mui/icons-material";
import PlaylistItem from "../../../../components/PlaylistItem/PlaylistItem";

function PlaylistsByType() {
    const location = useLocation()
    const routeType = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const itemSize = 3.5

    const { id: userId } = useAuthUser<AuthResponse>()!

    const { data, isError, isLoading } = useQuery({
            queryKey: ['user', userId,'playlists', routeType ],
            queryFn: async () => {
                switch(routeType) {
                    case "liked": return await getLikedPlaylists(userId);
                    default: return await getUserPlaylists(userId);
                }
            } 
        }
    )

    let content = <div></div>;

    if(isLoading) {
        content =  
        <div id={styles['loading-wrapper']}>
            <Loading message="Loading playlists"/>
        </div>
    }

    if(isError) {
        content = 
        <div id={styles['no-content-wrapper']}>
            <NoContent icon={<Warning/>} message={"Não foi possivel pegar as playlists"} />
        </div>
    }

    if(data && data.length > 0) {
        content = <div>
            <h1>Playlists {routeType === 'liked' ? 'Curtidas' : 'Públicas'}</h1>
            <Grid2 container spacing={1} columns={{ xs: (itemSize * 2), sm: (itemSize * 3), md: (itemSize * 4), lg: (itemSize * 5) }}>
            {
                data.map((playlist, index) => {
                    return (
                        <Grid2 key={`${playlist.name}_${index}`}  display="flex" justifyContent="center" alignItems="center" size={itemSize}>
                            <PlaylistItem createdAt={playlist.createdAt || ''} image={playlist.image} name={playlist.name} />
                        </Grid2>
                    )
                })
            }
                </Grid2>
        </div>
    }

    return ( 
        <>
            {content}
        </>
     );
}

export default PlaylistsByType;