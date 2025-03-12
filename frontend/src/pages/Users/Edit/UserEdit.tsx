import ProfilePictureDisplay from '../../../components/ProfilePictureDisplay/ProfilePictureDisplay';
import styles from "./UserEdit.module.scss";
import DefaultButton from "../../../components/DefaultButton/DefaultButton";
import { useEffect, useState } from 'react';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../../interfaces/auth.types";
import { useQueries } from "@tanstack/react-query";
import { findUser } from "../../../api/user";
import { TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import EditableList from '../../../components/EditableList/EditableList';
import userEditSchema, { UserEditFormTypeSchema } from './schemas/edituser.schema';
import { updateUser, UpdateUserData } from '../../../api/user/update';
import { useNavigate } from 'react-router-dom';

const UserEdit: React.FC = () => {
	const navigate = useNavigate();
	const user: AuthResponse = useAuthUser<AuthResponse>() || { id: "", email: "", name: "", image: "", token: "" };
	const userId = user.id;

	const [userImage, setUserImage] = useState<string>("");
	const [genres, setGenres] = useState<string[]>([]);
	const [isEditingImage, setIsEditingImage] = useState<boolean>(false);
	const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

	const results = useQueries({
		queries: [
			{ queryKey: ['user', userId, 'genres'], queryFn: async () => await findUser(userId), staleTime: Infinity },
		],
	})
	useEffect(() => {
		if (results[0].isSuccess) {
			formik.setFieldValue('username', results[0].data ? results[0].data.name : "");
			formik.setFieldValue('newUserImageLink', results[0].data.image ? results[0].data.image : "");
			setUserImage(results[0].data.image ? results[0].data.image : "");
			setGenres(results[0].data.favoriteGenres ? results[0].data.favoriteGenres : []);
			formik.validateForm();
		}
	}
		, [results[0].data]);

	const formik = useFormik<UserEditFormTypeSchema>({
		initialValues: {
			username: '',
			newUserImageLink: '',
		},
		validate: withZodSchema(userEditSchema),
		onSubmit: async (values) => {
			try {
				const data : UpdateUserData = { 
					name: values.username, 
					image: values.newUserImageLink || userImage, 
					favoriteGenres: genres }
				await sendUpdateUser(userId, data);
				navigate('/profile');
			} catch (error) {
				alert('Erro ao atualizar o perfil.' + error);
			}
		},
	});

	const toggleImageEdit = () => {
		if(formik.values.newUserImageLink && formik.errors.newUserImageLink){
			alert(formik.errors.newUserImageLink);
			return;
		}
		if(!formik.values.newUserImageLink){
			formik.setFieldValue('newUserImageLink', userImage);
		}
		if (isEditingImage) {
			setUserImage(formik.values.newUserImageLink || userImage);
		}
		setIsEditingImage(!isEditingImage);
	}

	const toggleUsernameEdit = () =>{
		if(isEditingUsername && formik.errors.username) {
			alert(formik.errors.username);
			return;
		}
		setIsEditingUsername(!isEditingUsername)
	}

	return (
		<form onSubmit={formik.handleSubmit} className={styles.container}>
			<div className={styles.profile}>
				<ProfilePictureDisplay className={styles.profileImage} profilePicture={userImage} />
				<div className={`${styles.slideOut} ${isEditingImage ? styles.active : ''}`}>
					<TextField
						name="newUserImageLink"
						value={formik.values.newUserImageLink}
						onChange={formik.handleChange}
						variant="filled"
						className={styles.profileImageInput}
						label="Link da imagem"
					/>
					{isEditingImage && formik.values.newUserImageLink && formik.errors.newUserImageLink ? <p className={styles.error}>{formik.errors.newUserImageLink}</p> : null}
				</div>
				<DefaultButton
					text={isEditingImage ? 'Salvar foto' : 'Mudar foto'}
					className={styles.editImageButton}
					onClick={toggleImageEdit}
					type="button"
				/>
				<div className={styles.usernameContainer}>
					{isEditingUsername ? (
						<TextField
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
						variant="filled"
						className={styles.username}
						label="Nome de usuário"
						/>
					) : (
						<p className={styles.username}>{formik.values.username}</p>
					)}
					<IconButton
						color='success'
						style={{ backgroundColor: 'white' }}
						onClick={toggleUsernameEdit}
						>
						<EditIcon htmlColor='black' />
					</IconButton>
				</div>
				{isEditingUsername && formik.errors.username ? <p className={styles.error}>{formik.errors.username}</p> : null}
			</div>
			<div className={styles.favoriteGenres}>
				<h2>Gêneros favoritos:</h2>
				<EditableList items={genres} setItems={setGenres} />
			</div>
			<DefaultButton className={styles.saveButton} type='submit' text='Salvar' />
		</form>
	)
}

async function sendUpdateUser(id: string, data: UpdateUserData) {
	console.log('Updating user:', id, data);
	updateUser(id, data);
}

export default UserEdit;