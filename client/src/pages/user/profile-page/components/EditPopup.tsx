import { useContext, useState } from "react";
import { userType } from "../../../../tools/data-types/userType";
import InputPopups from "./InputPopups";
import { sendRequest } from "../../../../tools/request-method/request";
import { UserContext, UserContextType } from "../../../../context/userContext";
import toast, { Toaster } from "react-hot-toast";

const EditPopup = ({ user }: { user: userType | null | undefined }) => {
  const { setUserTrigger } = useContext(UserContext) as UserContextType;

  const [userInfo, setUserInfo] = useState<{} | userType>({});

  const infoArray = [
    { title: "first name", value: user?.firstName, reqTitle: "firstName" },
    { title: "last name", value: user?.lastName, reqTitle: "lastName" },
    { title: "username", value: user?.username, reqTitle: "username" },
    { title: "age", value: user?.age, reqTitle: "age" },
  ];

  interface errorType {
    status: number;
  }

  const updateUser = async () => {
    try {
      const res = await sendRequest("PUT", "/user/update_my_info", userInfo);

      setUserTrigger((t) => !t);
      toast.success(`user updated succesfully`, {
        className: "dark:bg-blue-gray-900 dark:text-white",
      });
    } catch (error: errorType | any) {
      console.log(error);

      if (error?.response.status == 400)
        toast.error("username already taken", {
          className: "dark:text-white dark:bg-blue-gray-900",
        });
      else {
        toast.error("something went wrong", {
          className: "dark:bg-blue-gray-900",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Toaster />
      {infoArray.map((info, i) => (
        <InputPopups
          reqTitle={info.reqTitle}
          title={info.title}
          value={info.value}
          key={i}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      ))}
      <button className="btn-primary-white" onClick={updateUser}>
        Save
      </button>
    </div>
  );
};

export default EditPopup;
