import { ipcRenderer } from "electron";
import { useEffect } from "react";
import { Layout } from "../components/layout";
import Todos from "../components/Todos";
import Notes from "../components/Notes";
import { setNotesData, setTodosData } from "../store/notesSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const notes = ipcRenderer.sendSync("get-files");
    dispatch(setNotesData(notes));
    const todos = ipcRenderer.sendSync("get-tasks");
    if (todos.length > 0) dispatch(setTodosData(todos));
  }, []);

  return (
    <Layout>
      <Notes />
      <Todos />
      <img
        src="file:///home/camilo/doom-notes/assets/newton.png"
        alt="newton"
      />
    </Layout>
  );
}
