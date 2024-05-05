import {
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

const InputPopups = ({
  title,
  value,
}: {
  title: string | undefined;
  value: string | number | undefined;
}) => {
  return (
    <div className="flex gap-2 w-full items-center justify-between mt-2">
      <p>{title}</p>
      <Popover placement="bottom">
        <PopoverHandler>
          <button className="btn-primary-dark disabled-btn-dark">
            {value}
          </button>
        </PopoverHandler>
        <PopoverContent className="bg-primary flex flex-col items-center gap-2">
          <Input label={title} type="text" color="white" />
          <button className="btn-primary-white">edit</button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputPopups;
