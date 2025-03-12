import TextField from "@mui/material/TextField";
import styles from "./EditableList.module.scss";
import { useState } from "react";
import DefaultButton from "../DefaultButton/DefaultButton";

interface EditableListProps {
	items: string[];
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditableList: React.FC<EditableListProps> = ({ items, setItems }: EditableListProps) => {

	const [newItem, setNewItem] = useState<string>("");
	const [newItemClass, setNewItemClass] = useState<string>("");

	const handleAddItem = async () => {
		if (newItem === "") {
			alert("Item não pode ser vazio");
			return;
		}
		if (!items.includes(newItem)) {
			setItems([...items, newItem]);
			setNewItem("");
			setNewItemClass(styles.itemAdded);
			setTimeout(() => setNewItemClass(""), 500); // Remove the class after the animation
		}
		else {
			alert("Item já adicionado");
		}
	};

	const handleDeleteItem = (index: number) => {
		setItems(items.filter((_, i) => i !== index));
	};
	return (
		<div className={styles.itemsList}>
			{items.map((item, index) => (
				<p key={index} onClick={() => handleDeleteItem(index)} className={`${styles.item} ${index === items.length - 1 ? newItemClass : ''}`}>{item}</p>
			))}
			<TextField
				variant='standard'
				label="Novo gênero"
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
			/>
			<DefaultButton type="button" text='Adicionar' onClick={handleAddItem} />
		</div>
	);
}

export default EditableList;