import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

const Preview = ({ value, plugins }) => {
  return (
    <ReactMarkdown
      {...plugins}
      components={{
        img: ({ src, alt, title }) => (
          <div className="flex flex-col flex-wrap justify-center content-center items-center gap-2">
            <img
              src={`file:///home/camilo/doom-notes/assets/${src}`}
              className="max-w-sm"
              alt={alt}
            />
            <p className="text-center text-xs">{title}</p>
          </div>
        ),
      }}
      escapeHtml={false}
    >
      {value}
    </ReactMarkdown>
  );
};

const TextArea = ({ gramKey, content, callback, width }) => {
  return (
    <GrammarlyEditorPlugin clientId={gramKey}>
      <textarea
        className={`p-2 bg-[#161616] text-white focus:outline-none h-full ${width}`}
        defaultValue={content}
        onChange={callback}
        style={{ resize: "none" }}
      />
    </GrammarlyEditorPlugin>
  );
};

const Editor = ({ value, onChange, plugins, buttons, gramKey }) => {
  const [content, setContent] = useState(value);
  const [mode, setMode] = useState("split");

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (onChange) onChange(value);
    setTimeout(() => {
      setContent(value);
    }, 900);
  };

  // HACK: this function can be refactored.
  return (
    <div className="border border-[#262626]">
      <Toolbar setMode={setMode} mode={mode} buttons={buttons ? buttons : []} />
      <div className="grid grid-flow-col grid-rows-1 h-[70vh]">
        {mode == "editor" ? (
          <TextArea
            content={content}
            callback={handleChange}
            gramKey={gramKey}
            width={"w-full"}
          />
        ) : mode == "preview" ? (
          <div className="markdown-body text-white p-2 overflow-auto">
            <Preview value={content} plugins={plugins} />
          </div>
        ) : (
          <ScrollSync>
            <>
              <ScrollSyncPane>
                <TextArea
                  content={content}
                  callback={handleChange}
                  gramKey={gramKey}
                  width={"w-[36vw]"}
                />
              </ScrollSyncPane>
              <ScrollSyncPane>
                <div className="markdown-body w-[40vw] text-white p-2 overflow-auto border-l border-l-[#262626]">
                  <Preview value={content} plugins={plugins} />
                </div>
              </ScrollSyncPane>
            </>
          </ScrollSync>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { Preview, Editor };
