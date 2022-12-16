import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

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
      <Toolbar setMode={setMode} mode={mode} buttons={buttons} />
      <div className="grid grid-flow-col grid-rows-1 h-96">
        {mode == "editor" ? (
          <GrammarlyEditorPlugin clientId={gramKey}>
            <textarea
              className="p-2 bg-[#161616] text-white focus:outline-none w-full h-full"
              defaultValue={content}
              onChange={handleChange}
              style={{ resize: "none" }}
            />
          </GrammarlyEditorPlugin>
        ) : mode == "preview" ? (
          <div className="markdown-body text-white p-2 overflow-auto">
            <ReactMarkdown {...plugins}>{content}</ReactMarkdown>
          </div>
        ) : (
          <ScrollSync>
            <>
              <ScrollSyncPane>
                <GrammarlyEditorPlugin clientId={gramKey}>
                  <textarea
                    className="p-2 bg-[#161616] text-white focus:outline-none h-full w-[46.8vw] "
                    defaultValue={content}
                    onChange={handleChange}
                    style={{ resize: "none" }}
                  />
                </GrammarlyEditorPlugin>
              </ScrollSyncPane>
              <ScrollSyncPane>
                <div className="markdown-body text-white p-2 overflow-auto w-[46.8vw] border-l border-l-[#262626]">
                  <ReactMarkdown
                    {...plugins}
                    components={{
                      img: ({ src, alt }) => (
                        <img
                          src={`file:///home/camilo/doom-notes/assets/${src}`}
                          alt={alt}
                        />
                      ),
                    }}
                    escapeHtml={false}
                  >
                    {content}
                  </ReactMarkdown>
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

export default Editor;
