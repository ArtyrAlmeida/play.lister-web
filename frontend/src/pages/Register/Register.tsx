import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import registerSchema, { RegisterFormTypeSchema } from "./schemas/register.schema";
import { withZodSchema } from "formik-validator-zod";
import { TextField } from "@mui/material";
import styles from './Register.module.scss'
import { registerUser } from "../../api";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import logoSmall from '../../assets/images/Logo - Small.svg';

const Register: React.FC = () => {
    const signIn = useSignIn()

    const { mutate: registerUserMutate } = useMutation({
        mutationFn: async (values: RegisterFormTypeSchema) => {
            return await registerUser(values);
        },
        onSuccess: (data) => {
            signIn({
                auth: {
                    token: data.token,
                    type: 'Bearer',
                },
                userState: {
                    id: data.id,
                    email: data.email,
                    name: data.name,
                }
            })
        }
    })

    const formik = useFormik<RegisterFormTypeSchema>({
        initialValues: {
            email: '',
            password: '',
            name: '',
        },
        validate: withZodSchema(registerSchema),
        onSubmit: async (values) => {
            registerUserMutate(values)
        }
    })

    return (
        <>
            <div className={styles['logo']}>
                <img src={logoSmall} alt='play.lister logo normal size' />
            </div>
            <form onSubmit={formik.handleSubmit} className={styles['form']}>
                <div className={styles['form-group']}>
                    <div className={styles['form-control']}>
                        <label htmlFor="name">Nome</label>
                        <TextField className={styles['form-camp']} id="name" helperText={(formik.values.name && formik.errors.name) ? '' : 'Por favor, insira seu nome'} color={formik.errors.name ? "error" : "primary"} name="name" required variant="outlined" type="name" onChange={formik.handleChange} value={formik.values.name} />
                        {(formik.errors.name && formik.touched.name) && <div><p className={styles['form-error-message']}>{formik.errors.email}</p></div>}
                    </div>
                    <div className={styles['form-control']}>
                        <label htmlFor="email">Email</label>
                        <TextField className={styles['form-camp']} id="email" helperText={(formik.values.email && formik.errors.email) ? '' : 'Por favor, insira seu e-mail'} color={formik.errors.email ? "error" : "primary"} name="email" required variant="outlined" type="email" onChange={formik.handleChange} value={formik.values.email} />
                        {(formik.errors.email && formik.touched.email) && <div><p className={styles['form-error-message']}>{formik.errors.email}</p></div>}
                    </div>
                    <div className={styles['form-control']}>
                        <label htmlFor="password">Senha</label>
                        <TextField className={styles['form-camp']} id="password" name="password" helperText={(formik.values.password && formik.errors.password) ? '' : 'Por favor, insira sua senha'} color={formik.errors.password ? "error" : "primary"} required variant="outlined" type="password" onChange={formik.handleChange} value={formik.values.password} />
                        {(formik.errors.password && formik.touched.password) && <div><p className={styles['form-error-message']}>{formik.errors.password}</p></div>}
                    </div>
                </div>
                <div className={styles['form-actions']}>
                    <Link className={styles['navigate-control']} to="/login"><ArrowCircleLeftOutlined/>Voltar</Link>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </>
    )
}

export default Register;