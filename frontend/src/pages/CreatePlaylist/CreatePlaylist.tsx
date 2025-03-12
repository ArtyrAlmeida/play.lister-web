import PlaylistForm from "../../components/PlaylistForm/PlaylistForm";

import styles from "./CreatePlaylist.module.scss";

const CreatePlaylist: React.FC = () => {
    return <div id={styles.background}>
        <PlaylistForm mode="create" />
    </div>
}

export default CreatePlaylist;