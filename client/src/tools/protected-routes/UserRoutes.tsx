import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const UserProtection = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return user?.role == "admin" ? (
    <Navigate to={"/admin"} />
  ) : user?.role == "creator" ? (
    <Navigate to={"/creator"} />
  ) : (
    <Outlet />
  );
};

export default UserProtection;
