import { useState } from "react";
import { Playlist } from "../../interfaces/playlist.types"
import { useNavigate } from "react-router-dom";
import { toggleLikeRequest } from "../../api/likes/toggleLike";

import Cancel from '../../assets/images/Cancel.svg';
import Heart from '../../assets/images/Heart.svg';
import Pencil from '../../assets/images/Pencil.svg';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../interfaces/auth.types";

import styles from "./PlaylistDetailsButton.module.scss";
import Loading from "../Loading/Loading";
import NoContent from "../NoContent/NoContent";
import { Close } from "@mui/icons-material";

interface PlaylistDetailsButtonProps {
    playlist: Playlist
}

const PlaylistDetailsButton: React.FC<PlaylistDetailsButtonProps> = ({ playlist }) => {
    const user = useAuthUser<AuthResponse>();
    const userId = user!.id

    const navigate = useNavigate()

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
    
    if (playlist.author == userId) return (
        <button onClick={() => navigate(`/playlist/edit/${playlist._id}`)} className={styles.button}>
            <p>Editar playlist</p>
            <img src={ Pencil } alt="Botão para editar a playlist" />
        </button> 
    )

    if (isLoading) return <div><Loading message="Carregando Analytics"/></div>
    if (isError) return <NoContent icon={<Close />} message="Erro ao obter métricas"  />

    return (
        <button className={`${styles.button} ${isLiked ? styles.liked : ""}`} onClick={() => toggleLike()}>
            <p>{ isLiked ? "Curtido" : "Curtir" }</p>
            <img src={ isLiked ? Cancel : Heart } alt={ isLiked ? "Botão de cancelar curtida" : "Botão de curtir" } />
        </button>
    )
}

export default PlaylistDetailsButton