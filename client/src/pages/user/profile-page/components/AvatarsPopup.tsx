import React, { useContext, useEffect, useState } from "react";
import { sendRequest } from "../../../../tools/request-method/request";
import { IoMdClose } from "react-icons/io";
import { apiUrl } from "../../../../tools/api-url/apiUrl";
import Loader from "../../../../common/components/Loader";
import { UserContext, UserContextType } from "../../../../context/userContext";

const AvatarsPopup = ({ userAvatar }: { userAvatar: string }) => {
  const { setUserTrigger } = useContext(UserContext) as UserContextType;

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

  const changeAvatar = async (avatar: string) => {
    setLoading(true);
    try {
      const res = await sendRequest("PUT", "/user/update_my_info", {
        avatar: avatar,
      });
      setUserTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAvatars();
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-5 justify- mt-5">
          {avatars.map((avatar, i) => (
            <img
              src={`${apiUrl}/${avatar}`}
              key={i}
              className={`w-[100px] lg:w-[120px] rounded-full hover:opacity-90 cursor-pointer ${
                avatar == activeAvatar && "border-[5px] border-[#69F2FA]"
              }`}
              alt="avatar"
              onClick={() => {
                setActiveAvatar(avatar);
                changeAvatar(avatar);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarsPopup;
