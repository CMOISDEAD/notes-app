import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setTodosData } from "../store/notesSlice";

export default ({ task }) => {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    const new_tasks = [
      ...task,
      {
        id: task.length,
        name: section,
        items: [],
      },
    ];
    dispatch(setTodosData(new_tasks));
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="bg-[#161616bf] px-4 py-3 rounded-md flex flex-col justify-center content-center items-center gap-4 relative text-center text-gray-500 border border-transparent hover:border-white cursor-pointer col-span-full">
          <RxPlus />
          <p className="text-xs">Add a new section...</p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <p className="text-xl font-bold">Add a new section</p>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-500"
          >
            Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-[#262626] border border-gray-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-auto p-2"
            placeholder="note"
            onChange={(e) => setSection(e.target.value)}
          />
          <Dialog.Close asChild>
            <button
              className="bg-[#262626] py-1 px-2 rounded-md hover:bg-[#303030] my-2 cursor-pointer"
              onClick={handleSave}
              disabled={!section.length > 0}
            >
              Save changes
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <RxCross2 />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
