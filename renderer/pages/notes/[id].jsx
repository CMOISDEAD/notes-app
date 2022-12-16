import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import InfoNotes from "../../components/InfoNotes";
// bytemd
import { Editor, Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mermaid from "@bytemd/plugin-mermaid";
import "katex/dist/katex.min.css";

const plugins = [
  math(),
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  mermaid(),
];

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const allNotes = useSelector((state) => state.notes.notes);
  const [note] = useState(allNotes.find((n) => n.id == id));
  const [markdown, setMarkdown] = useState("");
  const [edit, setEdit] = useState(false);
  const [mode, setMode] = useState("split");

  useEffect(() => {
    (async () => {
      const content = ipcRenderer.sendSync("get-content", note.path);
      setMarkdown(content);
    })();
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
            {edit ? (
              <Editor
                mode={mode}
                value={markdown}
                plugins={plugins}
                editorConfig={{
                  lineNumbers: true,
                  autofocus: true,
                }}
                onChange={(v) => {
                  setMarkdown(v);
                }}
                uploadImages={async (files) => {
                  return [
                    {
                      url: `file://${files[0].path}`,
                      alt: `file://${files[0].path}`,
                      title: `file://${files[0].path}`,
                    },
                  ];
                }}
              />
            ) : (
              <Viewer value={markdown} plugins={plugins} />
            )}
          </div>
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </Layout>
  );
};
