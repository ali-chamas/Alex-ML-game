import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarLinks = ({
  type,
  setIsOpen,
}: {
  type: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  interface linksType {
    title: string;
    path: string;
  }

  const adminLinks: linksType[] | [] = [];

  const creatorLinks: linksType[] = [
    { title: "Home", path: "/creator" },
    { title: "Games", path: "/creator/games" },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full gap-4">
      {type == "admin"
        ? adminLinks.map((link, i) => (
            <button
              key={i}
              className=" text-lg btn-primary-dark h-[50px]"
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
            >
              {link.title}
            </button>
          ))
        : creatorLinks.map((link, i) => (
            <button
              key={i}
              className=" text-lg btn-primary-dark h-[50px]"
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
            >
              {link.title}
            </button>
          ))}
    </div>
  );
};

export default SidebarLinks;
