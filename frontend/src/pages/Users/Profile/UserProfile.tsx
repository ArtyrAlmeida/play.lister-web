import ProfilePictureDisplay from '../../../components/ProfilePictureDisplay/ProfilePictureDisplay';
import styles from "./UserProfile.module.scss";
import DefaultButton from "../../../components/DefaultButton/DefaultButton";
import { useEffect, useState } from 'react';
import search from '../../../assets/images/search.svg';
import edit from '../../../assets/images/edit.svg';
import Post, { PostProps } from '../../../components/Post/Post';
import imgg from '../../../assets/images/Logo.svg';
import { useParams } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../../interfaces/auth.types";
import { useQueries } from "@tanstack/react-query";
import { findUser } from "../../../api/user";

const UserProfile: React.FC = () => {
	const params = useParams();
	const user : AuthResponse = useAuthUser<AuthResponse>() || {id: "", email: "", name: "", image: "", token: ""};
	const userId = params.id as string || user.id;

	const [username, setUsername] = useState<string>("");
	const [userImage, setUserImage] = useState<string>("");
	const [genres, setGenres] = useState<string[]>([]);
	const [posts, setPosts] = useState<PostProps[]>([]);

	const results = useQueries({
		queries: [
			{ queryKey: ['user', userId,'genres'], queryFn: async () => await findUser(userId), staleTime: Infinity },
		],
	})
	useEffect(() => {
		// Fetch genres from user
		if (results[0].isSuccess) {
			console.log(results);
			console.log(user)
			setUsername(results[0].data.name ? results[0].data.name : "Username");
			setUserImage(results[0].data.image ? results[0].data.image : "");
			setGenres(results[0].data.genres ? results[0].data.genres : []);
		}
		setPosts([
			{title: "titulo da postagem", body: "X musicas", date: new Date()},
			{title: "titulo da postagem", body: "X musicas", date: new Date(), thumbnail: imgg},{title: "titulo da postagem", body: "X musicas", date: new Date()},
			{title: "titulo da postagem", body: "X musicas", date: new Date(), thumbnail: imgg},{title: "titulo da postagem", body: "X musicas", date: new Date()},
			{title: "titulo da postagem", body: "X musicas", date: new Date(), thumbnail: imgg},
		])

	}
	, [results[0].data]);

		return (
		<div className={styles.container}>
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
							<DefaultButton className={styles.editButton}  text="Editar perfil" icon={edit} />
						</div>
					}
				</div>
				<div className={styles.posts}>
					<h1>Ultimas Postagens</h1>

					<div className={styles.postsContainer}>
						{posts.map((post, index) => (
							<Post key={index} {...post} />
						))}
					</div>
						
				</div>
		
		</div>
		)
}

export default UserProfile;