import { Link } from "react-router-dom";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod'
import styles from './Login.module.scss';
import loginSchema, { LoginFormTypeSchema } from "./schemas/login.schema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api";
import useSignIn from "react-auth-kit/hooks/useSignIn"
import logo from '../../assets/images/Logo.svg'

const Login: React.FC = () => {
    const signIn = useSignIn()

    const { mutate: loginUserMutate } = useMutation({
        mutationFn: async (values: LoginFormTypeSchema) => {
            return await loginUser(values);
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
                    image: data.image || undefined,
                }
            })
        }
    })

    const formik = useFormik<LoginFormTypeSchema>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: withZodSchema(loginSchema),
        onSubmit: async (values) => {
            loginUserMutate(values)
        }
    })

    return (
        <>
            <div className={styles['logo']}>
                <img src={logo} alt='play.lister logo normal size' />
            </div>
            <form onSubmit={formik.handleSubmit} className={styles['form']}>
                <div className={styles['form-group']}>
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
                    <Link className={styles['navigate-control']} to="/register">Não tem uma conta? Registre-se <ArrowCircleRightOutlined /></Link>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </>
    )
}

export default Login;