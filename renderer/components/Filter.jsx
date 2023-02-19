import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsFilter, BsFilePlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setNotesData } from "../store/notesSlice";
import moment from "moment";

export default ({ notes }) => {
  const [type, setType] = useState("none");
  const dispatch = useDispatch();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="p-1 rounded-md w-[75vw] flex flex-row justify-between content-center items-center gap-4">
          <div className="left hover:bg-[#262626] cursor-pointer p-1 rounded-md inline-flex gap-3 items-center">
            <BsFilter />
            <p>by {type}</p>
          </div>
          <div className="right hover:bg-[#262626] cursor-pointer p-1 rounded-md">
            <BsFilePlus />
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Label className="DropdownMenuLabel">
            Sort by...
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={(e) => {
              e.preventDefault();
              const new_notes = [...notes].sort((a, b) =>
                moment(a.date).diff(b.date)
              );
              dispatch(setNotesData(new_notes));
              setType("date");
            }}
          >
            Date <div className="RightSlot">⌘+T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={(e) => {
              e.preventDefault();
              const new_notes = [...notes].sort((a, b) =>
                a.name.localeCompare(b.name)
              );
              dispatch(setNotesData(new_notes));
              setType("name");
            }}
          >
            Name <div className="RightSlot">⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={(e) => {
              e.preventDefault();
              const new_notes = [...notes].sort((a, b) => a.id - b.id);
              dispatch(setNotesData(new_notes));
              setType("none");
            }}
          >
            None <div className="RightSlot">⇧+⌘+N</div>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
