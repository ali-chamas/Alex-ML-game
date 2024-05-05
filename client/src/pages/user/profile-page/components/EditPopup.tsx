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
      <div className="flex justify-between items-center w-full ">
        <h1 className=" text-lg ">Play with your model</h1>

        <button onClick={() => setOpen(false)} className="text-xl ">
          <IoMdClose />
        </button>
      </div>
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
