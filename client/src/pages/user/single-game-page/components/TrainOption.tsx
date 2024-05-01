import { IoSettings } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
const TrainOption = () => {
  return (
    <div className="flex justify-between w-full items-center">
      <button className="rounded-full  bg-primary border p-2 hover:opacity-80">
        <IoSettings />
      </button>
      <div className="flex gap-2 items-center">
        <button className="rounded-full  bg-primary border p-2 hover:opacity-80">
          <FaLightbulb />
        </button>
        <button className="btn-primary-dark">add label</button>
      </div>
    </div>
  );
};

export default TrainOption;
