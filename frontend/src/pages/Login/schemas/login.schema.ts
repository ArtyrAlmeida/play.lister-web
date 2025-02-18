import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type LoginFormTypeSchema = z.infer<typeof loginSchema>

export default loginSchema;

export type { LoginFormTypeSchema };