import ProfilePictureDisplay from '../../../components/ProfilePictureDisplay/ProfilePictureDisplay';
import styles from "./UserProfile.module.scss";
import DefaultButton from "../../../components/DefaultButton/DefaultButton";
import { useEffect, useState } from 'react';
import search from '../../../assets/images/search.svg';
import edit from '../../../assets/images/edit.svg';
import Post, { PostProps } from '../../../components/Post/Post';
import { useNavigate, useParams } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../../interfaces/auth.types";
import { useQueries } from "@tanstack/react-query";
import { findUser } from "../../../api/user";
import { getUserPlaylists } from '../../../api/playlists/getUserPlaylists';
import { Playlist } from '../../../interfaces/playlist.types';

const UserProfile: React.FC = () => {

	const navigate = useNavigate();

	const params = useParams();
	const user : AuthResponse = useAuthUser<AuthResponse>()!;
	const userId = params.id as string || user.id;

	const [username, setUsername] = useState<string>("");
	const [userImage, setUserImage] = useState<string>("");
	const [genres, setGenres] = useState<string[]>([]);
	const [posts, setPosts] = useState<PostProps[]>([]);

	const results = useQueries({
		queries: [
			{ queryKey: ['user', userId,'genres'], queryFn: async () => await findUser(userId), staleTime: Infinity },
			{ queryKey: ['user', userId,'playlists', 'created'], queryFn: async () => await getUserPlaylists(userId), staleTime: Infinity },
		],
	})

	const [userInfoQuery, createdPlaylistsQuery] = results;
	useEffect(() => {
		if (userInfoQuery.isSuccess) {
			setUsername(userInfoQuery.data.name ? userInfoQuery.data.name : "Username");
			setUserImage(userInfoQuery.data.image ? userInfoQuery.data.image : "");
			setGenres(userInfoQuery.data.favoriteGenres ? userInfoQuery.data.favoriteGenres : []);
		}

		if(createdPlaylistsQuery.isSuccess) {
			const playlists : Playlist[] =  Array.isArray(createdPlaylistsQuery.data) ? createdPlaylistsQuery.data : [];
			const postPlaylists : PostProps[] = playlists.map(playlist => ({
				_id: playlist._id,
				title: playlist.name, 
				body: playlist.songs.join(", "), 
				date: (typeof playlist.createdAt === 'string') ? new Date(playlist.createdAt.split('/').reverse().join('-')) : playlist.createdAt, 
				thumbnail: playlist.image
			}));

			const sortedPosts = postPlaylists.sort((a, b) => {
				if (a.date && b.date) {
					return a.date.getTime() - b.date.getTime();
				}
				return 0;
			}).reverse();

			setPosts(sortedPosts);
		}
	}
	, [userInfoQuery.isSuccess, createdPlaylistsQuery.isSuccess]);

		return (
		<div className={`${styles.container} ${styles.background}`}>
				<div className={styles.profile}>
					<ProfilePictureDisplay className={styles.profileImage} profilePicture={userImage} />
					<div className={styles.profileInfo}>
						<h1>{username}</h1>
						{
							genres.length != 0 && 
							<b className={styles.userGenres} >Gêneros favoritos: {genres.join(", ")} </b>
						}
					</div>
					{ userId === user.id && 
						<div className={styles.buttons}>
							<DefaultButton className={styles.analyticsButton} text="Ver Analytics" icon={search} />
							<DefaultButton 
								className={styles.editButton}  
								text="Editar perfil" 
								icon={edit} 
								onClick={() => navigate('/profile/edit')} 
							/>
						</div>
					}
				</div>
				<div className={styles.posts}>
					<h1>Ultimas Postagens</h1>

					<div className={styles.postsContainer}>
						{posts.map((post, index) => (
							<div key={index} onClick={() => navigate(`/playlist/${post._id}`)} style={{ cursor: 'pointer' }}>
								<Post {...post} />
							</div>
						))}
					</div>
						
				</div>
		
		</div>
		)
}

export default UserProfile;