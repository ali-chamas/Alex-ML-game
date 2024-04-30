import { createContext, useEffect, useState } from "react";
import { userType } from "../tools/data-types/userType";
import { sendRequest } from "../tools/request-method/request";

interface UserContextType {
  user?: userType;
  token: string | null;
  addUser: (token: string) => void;
  removeUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const localToken = window.localStorage.getItem("token") || null;

  const [user, setUser] = useState<userType>();
  const [token, setToken] = useState<string | null>(localToken);

  const getLoggedInUser = async () => {
    try {
      const res = await sendRequest("GET", "/user/get_my_info");
      const data = res.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) getLoggedInUser();
  }, [token]);

  const addUser = (newToken: string) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
  };

  const removeUser = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
