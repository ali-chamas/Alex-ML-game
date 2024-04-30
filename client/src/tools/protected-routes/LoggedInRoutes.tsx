import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInProtection = () => {
  const { token, user } = useContext(UserContext) as UserContextType;
  return token ? (
    user?.role == "user" ? (
      <Navigate to={"/profile"} />
    ) : user?.role == "creator" ? (
      <Navigate to={"/creator"} />
    ) : (
      <Navigate to={"admin"} />
    )
  ) : (
    <Outlet />
  );
};

export default LoggedInProtection;
