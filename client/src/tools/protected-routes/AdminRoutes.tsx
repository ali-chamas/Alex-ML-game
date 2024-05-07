import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtection = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return user?.role == "user" ? (
    <Navigate to={"/profile"} />
  ) : user?.role == "creator" ? (
    <Navigate to={"/creator"} />
  ) : (
    <Outlet />
  );
};

export default AdminProtection;
