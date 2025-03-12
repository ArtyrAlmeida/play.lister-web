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

import styles from "./PlaylistForm.module.scss";
import DefaultImage from "../../assets/images/UploadImage.svg"

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
    const [songs, setSongs] = useState<string[]>(props.mode == "edit" ? props.initialValues.songs : ["67c755634727324631144667", "67c75579472732463114466a"]);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>(props.mode == "edit" ? props.initialValues.image : DefaultImage);
    const navigate = useNavigate()

    const user = useAuthUser<AuthResponse>();

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const url = event.target.value;
        setImageSrc(url);
        formik.setFieldValue("image", url)
    }

    return <>
        {isModalActive && <SongModal alreadyAddedSongs={songs} onAddSong={handleSongAdd} onCloseModal={() => setIsModalActive(false)} />}
        <div className={styles["wrapper"]}>

            <Link className={styles['navigate-control']} to={props.mode == "edit" ? `/playlist/${props.initialValues._id}` : "/"}><ArrowCircleLeftOutlined />Voltar</Link>

            <div className={styles.form}>
                <div className={styles["form-group"]}>
                    <img className={styles.image} onError={() => setImageSrc(DefaultImage)} src={imageSrc} alt="Imagem da playlist" />
                    <div className={styles['form-control']}>
                        <label className={styles['form-camp-tittle']} htmlFor="name">Nome da Playlist</label>
                        <TextField className={styles['form-camp']} id="name" helperText={(formik.values.name && formik.errors.name) ? '' : 'Por favor, insira no nome da playlist'} color={formik.errors.name ? "error" : "primary"} name="name" required variant="outlined" type="text" onChange={formik.handleChange} value={formik.values.name} />
                    </div>
                    <div className={styles['form-control']}>
                        <label className={styles['form-camp-tittle']} htmlFor="image">Imagem da Playlist</label>
                        <TextField className={styles['form-camp']} id="image" helperText={(formik.values.image && formik.errors.image) ? '' : 'Por favor, insira a url da imagem da playlist'} color={formik.errors.image ? "error" : "primary"} name="image" required variant="outlined" type="text" onChange={handleImageChange} value={formik.values.image} />
                    </div>
                    <div className={styles["songs-list"]}>
                        {songs.length && songs.map(song => <SongItem key={song} isForm={true} songId={song} onDeletion={handleSongDeletion} />)}
                        <button className={styles["bold-button"]} onClick={() => setIsModalActive(true)}>Adicionar Música</button>
                    </div>
                </div>
                <div className={styles["submit"]}>
                    <button className={styles["bold-button"]} onClick={formik.submitForm}>Finalizar</button>
                </div>
            </div>
        </div>
    </>
}

export default PlaylistForm;