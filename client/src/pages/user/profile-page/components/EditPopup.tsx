import { IoMdClose } from "react-icons/io";
import { userType } from "../../../../tools/data-types/userType";
import InputPopups from "./InputPopups";

const EditPopup = ({
  setOpen,
  user,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: userType | null | undefined;
}) => {
  const infoArray = [
    { title: "first name", value: user?.firstName, reqTitle: "firstName" },
    { title: "last name", value: user?.lastName, reqTitle: "lastName" },
    { title: "username", value: user?.username, reqTitle: "username" },
    { title: "age", value: user?.age, reqTitle: "age" },
  ];

  return (
    <>
      {infoArray.map((info, i) => (
        <InputPopups
          reqTitle={info.reqTitle}
          title={info.title}
          value={info.value}
          key={i}
        />
      ))}
    </>
  );
};

export default EditPopup;
