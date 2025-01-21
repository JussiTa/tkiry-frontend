import { Navigate } from "react-router-dom";
import {useAuthContext} from "../features/auth/hooks/use-auth-context"
export const Logout = () => {

    const{logout, isAuthenticated} = useAuthContext();
  if(!isAuthenticated)
  return(
  <button className="submit-button"  onClick={() => logout()}> Logout</button>
  );

  return ( <Navigate to="/login" replace />)
};
