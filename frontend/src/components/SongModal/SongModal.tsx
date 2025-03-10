import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllSongs } from "../../api/songs/getAllSongs";
import { Song } from "../../interfaces/music.types";

interface SongModalProps {
    onAddSong: (id: string) => void;
    alreadyAddedSongs: string[];
    onCloseModal: () => void;
}

const SongModal: React.FC<SongModalProps> = ({ onAddSong, alreadyAddedSongs }) => {
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

    return <div>
        <button>Fechar</button>
        <div>
            <label htmlFor="song-search">Buscar Música</label>
            <input id="song-search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} name="Pesquisa de músicas" type="text" />
        </div>
        <div>
            { songs && songs.map(song => (
                <div key={song._id!} onClick={() => onAddSong(song._id!)}>
                    <img style={{display: "none"}} src={song.image} alt={`Imagem da música ${song.name}`} />
                    <div>
                        <div>
                            <h4>{song.name}</h4>
                            <p>{song.author}</p>
                        </div>
                        <div>
                            <p>{song.genre}</p>
                        </div>
                    </div>
                </div>
            )) }
        </div>
    </div>
}

export default SongModal;