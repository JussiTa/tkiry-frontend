import { Navigate } from "react-router-dom";
import { useAuthContext } from "../features/auth/hooks/use-auth-context";
export const Logout = () => {
  const { logout } = useAuthContext();
  logout();

  return (
    <>
      ( <Navigate to="/login" replace />)
    </>
  );
};
