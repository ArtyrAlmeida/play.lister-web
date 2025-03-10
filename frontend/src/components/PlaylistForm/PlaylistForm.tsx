import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SongItem from "../../components/SongItem/SongItem";
import SongModal from "../../components/SongModal/SongModal";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { PlaylistSchema } from "./schemas/create-playlist.schema";
import { TextField } from "@mui/material";
import { Playlist } from "../../interfaces/playlist.types";
import { AuthResponse } from "../../interfaces/auth.types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { createOrEditPlaylist } from "../../api/playlists/createOrEditPlaylist";

type CreatePlaylistProps = {
    mode: "edit"
    initialValues: {
        name: string;
        songs: string[];
        image: string;
        usersLiked: string[],
        _id: string,
    }
} | {
    mode: "create";
}

const PlaylistForm: React.FC<CreatePlaylistProps> = (props) => {
    const [songs, setSongs] = useState<string[]>(props.mode == "edit" ? props.initialValues.songs : []);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const navigate = useNavigate()

    const user = { id: "67c7516772cabf569761e217", name: "Artur" };
    
    const formik = useFormik({
        initialValues: props.mode == "edit" ? props.initialValues : {
            name: "",
            image: "",
            songs: [] as string[]
        },
        validate: withZodSchema(PlaylistSchema),
        onSubmit: async (values) => {
            if (user) {
                try {
                    const playlist: Playlist = {
                        author: user.id,
                        authorName: user.name,
                        image: values.image,
                        name: values.name,
                        songs: values.songs,
                        usersLiked: props.mode == "edit" ? props.initialValues.usersLiked : [],
                    }
                    
                    const id = props.mode == "edit" ? props.initialValues._id : "";
    
                    const result = await createOrEditPlaylist(playlist, props.mode, id);
                    navigate(`/playlist/${result._id!}`);
                } catch (error) {
                    console.log(error);
                    
                }
            }
        }
    })

    const handleSongDeletion = (id: string) => {
        const updatedSongs = songs.filter(song => song != id);
        setSongs(updatedSongs);
        formik.setFieldValue(
            "songs",
            updatedSongs
        )
    }

    const handleSongAdd = (id: string) => {
        const updatedSongs = songs.concat(id);
        setSongs(updatedSongs);
        formik.setFieldValue(
            "songs",
            updatedSongs
        )
        setIsModalActive(false); 
    }
    
    return <>
        { isModalActive &&  <SongModal alreadyAddedSongs={songs} onAddSong={handleSongAdd} onCloseModal={() => setIsModalActive(false)} /> }
        <div>
            <div>
                <Link to="/"><ArrowCircleLeftOutlined />Voltar</Link>
            </div>
            <div>
                <div>
                    <img src={formik.values.image || ""} alt="Imagem da playlist" />
                    <div>
                        <TextField id="name" helperText={(formik.values.name && formik.errors.name) ? '' : 'Nome da Playlist'} color={formik.errors.name ? "error" : "primary"} name="name" required variant="outlined" type="text" onChange={formik.handleChange} value={formik.values.name} />
                    </div>
                    <div>
                        <TextField id="email" helperText={(formik.values.image && formik.errors.image) ? '' : 'Imagem da Playlist'} color={formik.errors.image ? "error" : "primary"} name="image" required variant="outlined" type="text" onChange={formik.handleChange} value={formik.values.image} />
                    </div>
                </div>
                <div>
                    { songs.length && songs.map(song => <SongItem key={song} isForm={true} songId={song} onDeletion={handleSongDeletion} />) }
                    <button onClick={() => setIsModalActive(true)}>Adicionar Música</button>
                </div>
            </div>
            <div>
                <button type="submit" onClick={formik.submitForm}>Finalizar</button>
            </div>
        </div>
    </>
}

export default PlaylistForm;