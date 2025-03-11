import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllSongs } from "../../api/songs/getAllSongs";
import { Song } from "../../interfaces/music.types";

import Close from "../../assets/images/Close.svg";

import styles from "./SongModal.module.scss";
import TextField from "@mui/material/TextField";

interface SongModalProps {
    onAddSong: (id: string) => void;
    alreadyAddedSongs: string[];
    onCloseModal: () => void;
}

const SongModal: React.FC<SongModalProps> = ({ onAddSong, alreadyAddedSongs, onCloseModal }) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [songs, setSongs] = useState<Song[]>([]);

    const { data, isLoading, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: [`songs`],
        queryFn: async () => {
            const allSongs = await getAllSongs()
            const songsToDisplay = allSongs.filter(song => !alreadyAddedSongs.some(added => added  == song._id));
            if (songsToDisplay) setSongs(songsToDisplay);
            return allSongs;
        }
    });

    useEffect(() => {
        const identifier = setTimeout(() => {
            if (searchInput == "") {
                const songsToDisplay = data!.filter(song => !alreadyAddedSongs.some(added => added  == song._id));
                setSongs(songsToDisplay);
            }
            else {
                const songsToUpdate = songs.filter(song => song.name.match(new RegExp(searchInput, "i")));
                setSongs(songsToUpdate);
            }
        }, 1000);

        return () => {
            clearTimeout(identifier);
        };
    }, [searchInput])

    if (isLoading) {
        return <div>
            <h3>Loading</h3>
        </div>
    }

    if (error) {
        return <div>
            <h3>Error</h3>
        </div>
    }

    return <>
        <div className={styles.modal}>
            <img className={styles.close} src={Close} alt="Fechar adição de músicas" onClick={onCloseModal} />
            <div className={styles['form-control']}>
                <label className={styles['form-camp-tittle']} htmlFor="song-search">Buscar Música</label>
                <TextField className={styles['form-camp']} id="song-search" color={"primary"} name="Pesquisa de músicas" required variant="outlined" type="text" onChange={(event) => setSearchInput(event.target.value)} value={searchInput}  />
            </div>
            <div className={styles.list}>
                { songs && songs.map(song => (
                    <div className={styles.song} key={song._id!} onClick={() => onAddSong(song._id!)}>
                        <img src={song.image} alt={`Imagem da música ${song.name}`} />
                        <div className={styles["song-info"]}>
                            <div className={styles["top"]}>
                                <h3>{song.name}</h3>
                                <p>{song.author}</p>
                            </div>
                            <p className={styles.bottom}>{song.length}</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
        <div className={styles["black-box"]} onClick={onCloseModal}></div>
    </>
}

export default SongModal;