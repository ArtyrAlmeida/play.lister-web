import styles from "./Post.module.scss";

export interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	body: string;
	date?: Date;
	thumbnail?: string;
}

function Post({ title, body, date, thumbnail, ...divProps } : PostProps){
	return (
		<div className={styles.post} {...divProps}>
			{thumbnail && <img src={thumbnail} alt="Post Thumbnail" />}
			<div>
				<h1>{title}</h1>
				<p className={styles.postBody}>{body}</p>
				{date && <p className={styles.dateLabel}>Data da postagem: {date.toLocaleDateString()}</p>}
			</div>
		</div>
	);
};

export default Post;