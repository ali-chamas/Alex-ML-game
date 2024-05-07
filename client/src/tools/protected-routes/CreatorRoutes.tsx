import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const CreatorProtection = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return user?.role == "user" ? (
    <Navigate to={"/profile"} />
  ) : user?.role == "admin" ? (
    <Navigate to={"/admin"} />
  ) : (
    <Outlet />
  );
};

export default CreatorProtection;
