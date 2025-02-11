import s from "./DefaultButton.module.sass";

interface DefaultButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	icon?: string;
} 

function DefaultButton({text, icon, style, onClick, ...rest} : DefaultButtonProps) {

	return (
		<button className={s.button} style={style} onClick={onClick} {...rest}>
			{text}
			{ icon && <img src={icon} alt="icon" /> }
		</button>
	)
}

export default DefaultButton;