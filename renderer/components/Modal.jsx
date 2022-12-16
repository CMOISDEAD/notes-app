import { ipcRenderer } from "electron";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setNotesData } from "../store/notesSlice";

export default ({ children, id, name, description }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    name,
    description,
  });
  const currentNotes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const new_notes = currentNotes.map((n) => {
      if (n.id == id) {
        return { ...n, name: note.name, description: note.description };
      }
      return n;
    });
    dispatch(setNotesData(new_notes));
    // window.electronAPI.saveStore(new_notes);
    ipcRenderer.sendSync("save-notes", new_notes);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="p-1 rounded-md hover:bg-[#262626ff]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit note</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your note here. Click save when you're done.
          </Dialog.Description>
          <div className="grid gap-6 md:grid-cols-2 my-2">
            <div className="">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-[#262626] border border-gray-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-auto p-2"
                placeholder="note"
                defaultValue={name}
                onChange={handleChange}
              />
            </div>
            <div className="">
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
                placeholder="description"
                defaultValue={description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-[#262626] py-1 px-2 rounded-md hover:bg-[#303030]"
                onClick={handleSave}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
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
