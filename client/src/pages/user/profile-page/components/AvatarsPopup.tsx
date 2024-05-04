import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import { IoMdClose } from "react-icons/io";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import Loader from "../../../../common/components/Loader";

const AvatarsPopup = ({
  userAvatar,
  setOpen,
}: {
  userAvatar: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [avatars, setAvatars] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeAvatar, setActiveAvatar] = useState(userAvatar);

  const getAvatars = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("GET", "/user/get_avatars");
      setAvatars(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const changeAvatar = async () => {
    try {
      const res = await sendRequest("PUT", "/user/update_my_info", {
        avatar: activeAvatar,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvatars();
  }, []);

  console.log(userAvatar);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex justify-between items-center w-full ">
        <h1 className=" text-lg ">Choose your avatar!</h1>

        <button onClick={() => setOpen(false)} className="text-xl ">
          <IoMdClose />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-5 justify-center">
          {avatars.map((avatar, i) => (
            <img
              src={`${apiUrl}/${avatar}`}
              key={i}
              className={`w-[100px] rounded-full hover:opacity-90 cursor-pointer ${
                avatar == activeAvatar && "border-[5px] border-[#69F2FA]"
              }`}
              alt="avatar"
              onClick={() => {
                setActiveAvatar(avatar);
                changeAvatar();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarsPopup;
