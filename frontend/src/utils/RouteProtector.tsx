import { Outlet, Navigate } from "react-router-dom";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function RouteProtector() {
    const user = useAuthUser();
    return user ? <Outlet/> : <Navigate to={'/login'}/>
}

export default RouteProtector;