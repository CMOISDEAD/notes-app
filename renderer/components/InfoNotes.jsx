import * as Popover from "@radix-ui/react-popover";
import { RxInfoCircled, RxCross2 } from "react-icons/rx";

export default ({
  name,
  description,
  date,
  user,
  callback,
  saveFile,
  mode,
  setMode,
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="IconButton absolute top-0 right-0"
          aria-label="Update dimensions"
        >
          <RxInfoCircled />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div className="flex flex-col gap-4">
            <p className="Text font-bold capitalize">Note info</p>
            <div className="flex flex-col justify-start content-start items-start gap-4">
              <p className="capitalize">
                Name: <span className="font-normal">{name}</span>
              </p>
              <p className="capitalize">
                Description: <span className="text-sm">{description}</span>
              </p>
              <p className="capitalize">
                User: <span className="font-normal">{user}</span>
              </p>
              <p className="capitalize">
                Date: <span className="font-normal">{date}</span>
              </p>
            </div>
            <p className="Text font-bold capitalize">Note settings</p>
            <div className="flex flex-col justify-start content-start items-start gap-4">
              <button
                className="text-white px-2 py-1 bg-[#262626] rounded-md hover:bg-[#303030]"
                onClick={callback}
              >
                Change Mode
              </button>
              <button
                className="text-white px-2 py-1 bg-sky-700 rounded-md hover:bg-sky-800"
                onClick={() => {
                  if (mode == "split") setMode("tab");
                  else setMode("split");
                }}
              >
                Change editor mode
              </button>
              <button
                className="text-white px-2 py-1 bg-green-700 rounded-md hover:bg-green-800"
                onClick={saveFile}
              >
                Save File
              </button>
              <button className="text-white px-2 py-1 bg-red-700 rounded-md hover:bg-red-800">
                Delete Note
              </button>
            </div>
          </div>
          <Popover.Close className="PopoverClose" aria-label="Close">
            <RxCross2 />
          </Popover.Close>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
