import { ipcRenderer } from "electron";
import { useState } from "react";
import AddSection from "./AddSection";
import AddTodo from "./AddTodo";
import { useSelector } from "react-redux";
import { RxMinus } from "react-icons/rx";
import { setTodosData } from "../store/notesSlice";
import { useDispatch } from "react-redux";

const Task = ({ id, name, description, status }) => {
  const [complete, setComplete] = useState(status);

  return (
    <div
      className="bg-[#161616] px-4 py-3 rounded-md flex justify-start content-center items-center gap-4"
      key={id}
    >
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 ring-2 bg-gray-700 border-gray-600"
        checked={complete}
        onChange={() => {
          setComplete(!complete);
        }}
      />
      <div className={`info ${complete && "line-through italic"}`}>
        <h5 className="font-bold">{name}</h5>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default () => {
  // const [task, setTasks] = useState([]);
  const task = useSelector((state) => state.notes.todos);
  const dispatch = useDispatch();

  return (
    <div>
      <h3 className="text-xl font-bold text-center">Todo List</h3>
      <div className="text-sm text-gray-300 text-center mb-3">
        Several collection of <span className="font-bold underline">todos</span>{" "}
        with no really value.
      </div>
      <div className="grid grid-cols-3 grid-flow-row gap-2">
        {task &&
          task.map(({ name, items }, i) => (
            <div key={i}>
              <p className="font-bold text-xl uppercase text-center mb-2">
                {name}
              </p>
              <div className="bg-[#161616bf]  py-3 rounded-md relative h-[36vh]">
                <div className="flex flex-col justify-start gap-4 overflow-y-auto h-full px-4">
                  {items &&
                    items.map((todo, key) => <Task key={key} {...todo} />)}
                </div>
                <AddTodo task={task} items={items} i={i} />
                <div
                  className="text-white bg-red-500 p-1 rounded-md hover:bg-red-700 absolute bottom-[-5px] right-[-5px] cursor-pointer"
                  onClick={() => {
                    const savior = task.filter((a) => a.name != name);
                    dispatch(setTodosData(task.filter((a) => a.name != name)));
                    // const response = window.electronAPI.saveTasks(savior);
                    ipcRenderer.sendSync("save-tasks", savior);
                  }}
                >
                  <RxMinus />
                </div>
              </div>
            </div>
          ))}
        <AddSection task={task} />
      </div>
    </div>
  );
};
