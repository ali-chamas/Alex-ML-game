import { useContext } from "react";
import { UserContext, UserContextType } from "../../../context/userContext";

const Profile = () => {
  const { user } = useContext(UserContext) as UserContextType;

  console.log(user);

  return <div>Profile</div>;
};

export default Profile;
