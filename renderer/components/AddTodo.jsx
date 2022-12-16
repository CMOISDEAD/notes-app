import { ipcRenderer } from "electron";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/notesSlice";

export default ({ task, items, i }) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const new_task = [
      ...task[i].items,
      {
        id: items.length,
        ...todo,
        status: false,
      },
    ];
    dispatch(addTodo([task[i].name, new_task]));
    setOpen(false);
    const savior = [
      ...task.filter((section) => section.name != task[i].name),
      {
        name: task[i].name,
        items: new_task,
      },
    ];
    // const response = window.electronAPI.saveTasks(savior);
    ipcRenderer.sendSync("save-tasks", savior);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="text-white bg-green-500 p-1 rounded-md hover:bg-green-700 absolute top-[-5px] right-[-5px] cursor-pointer">
          <RxPlus />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <p className="text-xl font-bold">Add a new todo</p>
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
            onChange={handleChange}
          />
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-500"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="bg-[#262626] border border-gray-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-auto p-2"
            placeholder="note"
            onChange={handleChange}
          />
          <Dialog.Close asChild>
            <button
              className="bg-[#262626] py-1 px-2 rounded-md hover:bg-[#303030] my-2 cursor-pointer"
              onClick={handleSave}
              disabled={!todo.name.length > 0}
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
