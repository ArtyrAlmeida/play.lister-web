import { Outlet, Navigate } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { AuthResponse } from "../interfaces/auth.types";
import Header from "../components/Header/Header";

function RouteProtector() {
    const user = useAuthUser<AuthResponse>();
    const Layout = () => {
        return <>
            <Header />
            <Outlet/>
        </>
    }
    return user ? <Layout /> : <Navigate to={'/login'}/>
}

export default RouteProtector;