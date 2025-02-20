import { Playlist } from "../../interfaces/playlist.types";
import Slider from "react-slick";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import NoContent from "../NoContent/NoContent";
import { Warning } from "@mui/icons-material";

interface PlaylistListProps {
    playlists: Playlist[];
    listTittle: string
}

function PlaylistList({ playlists, listTittle }: PlaylistListProps) {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: (playlists.length > 1) ? 10 : 1,
        slidesToScroll: 1,
    }

    return (
        <div>
            <h1>{listTittle}</h1>
            <Slider {...sliderSettings}>
                {(playlists.length > 0) ? playlists.map((playlist) => (
                    <PlaylistItem key={playlist.tittle} creationDate={playlist.creationDate} imageUrl={playlist.imageUrl} tittle={playlist.tittle} />
                )) : <NoContent icon={<Warning />} message="Nenhuma playlist encontrada" />}
            </Slider>
        </div>
    );
}

export default PlaylistList;