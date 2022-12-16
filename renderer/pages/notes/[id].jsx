import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import InfoNotes from "../../components/InfoNotes";
// doom-md
import "katex/dist/katex.min.css";
import { Editor, Preview } from "../../components/editor";
import { VscSave } from "react-icons/vsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const allNotes = useSelector((state) => state.notes.notes);
  const [note] = useState(allNotes.find((n) => n.id == id));
  const [markdown, setMarkdown] = useState("x");
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [mode, setMode] = useState("split");

  useEffect(() => {
    const content = ipcRenderer.sendSync("get-content", note.path);
    setMarkdown(content);
    setLoaded(true);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    ipcRenderer.sendSync("write-file", note.path, markdown);
  };

  return (
    <Layout>
      {note ? (
        <div>
          <div className="header relative flex flex-row justify-between content-center items-center border-b border-b-[#262626] py-1 mb-3">
            <div className="info py-2">
              <p className="text-xl font-bold capitalize">{note.name}</p>
              <p className="text-xs">{note.description}</p>
            </div>
            <InfoNotes
              {...note}
              callback={() => setEdit(!edit)}
              saveFile={handleSave}
              mode={mode}
              setMode={setMode}
            />
          </div>
          <div className="container mx-auto markdown-body">
            {loaded && edit ? (
              <Editor
                value={markdown}
                onChange={(v) => {
                  setMarkdown(v);
                }}
                plugins={{
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypeKatex],
                }}
                buttons={[
                  {
                    name: "save file",
                    onclick: handleSave,
                    icon: <VscSave />,
                  },
                ]}
                gramKey={"client_1hP8unaKk95116h6jzKpb5"}
              />
            ) : (
              <Preview
                value={markdown}
                plugins={{
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [rehypeKatex],
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </Layout>
  );
};
