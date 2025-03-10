import { Outlet, Navigate } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { AuthResponse } from "../interfaces/auth.types";

function RouteProtector() {
    const user = useAuthUser<AuthResponse>();
    return user ? <Outlet/> : <Navigate to={'/login'}/>
}

export default RouteProtector;