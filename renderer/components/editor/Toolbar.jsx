import {
  TbSquareToggle,
  TbSquareToggleHorizontal,
  TbBrandGithub,
} from "react-icons/tb";

export default ({ setMode, mode, buttons }) => {
  return (
    <div className="bg-[#181818] border-b border-b-[#262626] text-white flex flex-row justify-between content-center items-center gap-4 px-2 py-1 text-xs">
      <div className="italic">Mark-doom</div>
      <div className="flex justify-center content-center items-center gap-5">
        {buttons.map((button, i) => (
          <div
            key={i}
            onClick={button.onclick}
            className="rounded-md p-1 hover:bg-[#262626] cursor-pointer"
          >
            {button.icon}
          </div>
        ))}
        <div
          className={`rounded-md p-1 hover:bg-[#262626] cursor-pointer ${mode == "editor" && "bg-[#262626]"
            }`}
          onClick={() => {
            if (mode == "editor") setMode("split");
            else setMode("editor");
          }}
        >
          <TbSquareToggle />
        </div>
        <div
          className={`rounded-md p-1 hover:bg-[#262626] cursor-pointer ${mode == "preview" && "bg-[#262626]"
            }`}
          onClick={() => {
            if (mode == "preview") setMode("split");
            else setMode("preview");
          }}
        >
          <TbSquareToggleHorizontal />
        </div>
        <div className="rounded-md p-1 hover:bg-[#262626] cursor-pointer">
          <a href="https://github.com/CMOISDEAD/" target="blank">
            <TbBrandGithub />
          </a>
        </div>
      </div>
    </div>
  );
};
