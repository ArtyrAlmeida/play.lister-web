import { useState } from "react";
import { Playlist } from "../../interfaces/playlist.types"
import { Link } from "react-router-dom";
import { toggleLikeRequest } from "../../api/likes/toggleLike";

import Cancel from '../../assets/images/Cancel.svg';
import Heart from '../../assets/images/Heart.svg';
import Pencil from '../../assets/images/Pencil.svg';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../interfaces/auth.types";

interface PlaylistDetailsButtonProps {
    playlist: Playlist
}

const PlaylistDetailsButton: React.FC<PlaylistDetailsButtonProps> = ({ playlist }) => {
    const user = useAuthUser<AuthResponse>();
    const userId = user!.id

    const [isLiked, setIsLiked] = useState<boolean>(playlist.usersLiked.includes(userId));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const toggleLike = async () => {
        setIsLoading(true);
        try {
            await toggleLikeRequest(isLiked, playlist._id!, userId);
            if (isLiked) setIsLiked(false);
            else setIsLiked(true)
        } catch (error) {
            setIsError(true);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    if (playlist.author != userId) return (
        <Link to={`/playlist/edit/${playlist._id}`}>
            <button>
                <p>Editar playlist</p>
                <img src={ Pencil } alt="Botão para editar a playlist" />
            </button> 
        </Link>
    )

    if (isLoading) return <h3>Loading</h3>
    
    if (isError) return <h3>Erro</h3>

    return (
        <button onClick={() => toggleLike()}>
            <p>{ isLiked ? "Curtido" : "Curtir" }</p>
            <img src={ isLiked ? Cancel : Heart } alt={ isLiked ? "Botão de cancelar curtida" : "Botão de curtir" } />
        </button>
    )
}

export default PlaylistDetailsButton