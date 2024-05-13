import { createContext, useEffect, useState } from "react";
import { userType } from "../tools/data-types/userType";
import { sendRequest } from "../tools/request-method/request";

export interface UserContextType {
  user?: userType | null;
  token: string | null;

  addUser: (token: string, user: userType) => void;
  removeUser: () => void;
  userTrigger: Boolean;
  setUserTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const localToken = window.localStorage.getItem("token") || null;

  const [user, setUser] = useState<userType | null>();
  const [token, setToken] = useState<string | null>(localToken);
  const [userTrigger, setUserTrigger] = useState<boolean>(false);

  const getLoggedInUser = async () => {
    try {
      const res = await sendRequest("GET", "/user/get_my_info");
      const data = res.data;

      setUser(data);
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (token) {
      getLoggedInUser();
    } else setUser(null);
  }, [token, userTrigger]);

  const addUser = (newToken: string, newUser: userType) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
    setUser(newUser);
  };

  const removeUser = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, token, addUser, removeUser, userTrigger, setUserTrigger }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
