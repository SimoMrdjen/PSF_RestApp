import {useLocation,Navigate, Outlet} from "react-router-dom";
import  useAuth from "../hooks/useAuth";
import App1 from "../App1";
import App from "../App";


const RequiredAuth = () => {
    const auth = useAuth();
    const location = useLocation();

    return (
        auth.email
            ? <App/>
            : <Navigate to="/login" state={{from: location} } replace />
    )

}
export default RequiredAuth;