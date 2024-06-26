import { useContext } from "react";
import { UserContext, UserContextType } from "../../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInProtection = () => {
  const { token, user } = useContext(UserContext) as UserContextType;
  return token ? (
    user?.role == "user" ? (
      <Navigate to={"/games"} />
    ) : user?.role == "creator" ? (
      <Navigate to={"/creator"} />
    ) : (
      user?.role == "admin" && <Navigate to={"admin"} />
    )
  ) : (
    <Outlet />
  );
};

export default LoggedInProtection;
