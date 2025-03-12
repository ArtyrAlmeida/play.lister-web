import placeholder from "../../assets/images/PlaceholderProfilePicture.svg";
import styles from "./ProfilePicture.module.scss";

interface ProfilePictureDisplayProps extends React.HTMLAttributes<HTMLImageElement> {
	profilePicture: string;
}

export const ProfilePictureDisplay = ({ profilePicture, className, ...others }:ProfilePictureDisplayProps) => {
	return (
		<img 
			src={profilePicture ? profilePicture : placeholder}
			alt="Profile Picture"
			className={`${styles.profilePicture} ${className}`}
			{...others}
		/>
	);
};

export default ProfilePictureDisplay;