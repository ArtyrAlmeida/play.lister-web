import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    name: z.string().min(8, { message: 'Nome deve ter no mínimo 8 caracteres' }),
})

type RegisterFormTypeSchema = z.infer<typeof registerSchema>

export default registerSchema;

export type { RegisterFormTypeSchema };