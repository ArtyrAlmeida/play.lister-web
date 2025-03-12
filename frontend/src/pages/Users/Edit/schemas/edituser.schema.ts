import { z } from "zod";

const userEditSchema = z.object({
	username: z.string().nonempty('Nome de usuário é obrigatório'),
	newUserImageLink: z.string().url('Link da imagem deve ser uma URL válida').optional(),
});

type UserEditFormTypeSchema = z.infer<typeof userEditSchema>;


export default userEditSchema;

export type { UserEditFormTypeSchema };