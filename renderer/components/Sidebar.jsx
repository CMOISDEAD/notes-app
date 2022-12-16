import { RxDashboard, RxGear, RxGithubLogo } from "react-icons/rx";
import { VscFiles, VscTasklist } from "react-icons/vsc";
import Link from "next/link";

export default () => {
  return (
    <div className="bg-[#060606] w-[20vw] h-[91vh] px-3 py-2">
      <ul className="items h-[88vh] flex flex-col justify-between">
        <div>
          <Link href="/">
            <li className="text-xl my-2 px-2 py-1 rounded-sm hover:bg-[#161616] cursor-pointer flex content-center items-center gap-4">
              <RxDashboard />
              Dashboard
            </li>
          </Link>
          <Link href="/notes">
            <li className="text-xl my-2 px-2 py-1 rounded-sm hover:bg-[#161616] cursor-pointer flex content-center items-center gap-4">
              <VscFiles />
              Notes
            </li>
          </Link>
          <Link href="/todos">
            <li className="text-xl my-2 px-2 py-1 rounded-sm hover:bg-[#161616] cursor-pointer flex content-center items-center gap-4">
              <VscTasklist />
              Todos
            </li>
          </Link>
        </div>
        <div className="text-xs text-gray-500 border-t border-t-[#262626]">
          <li className="my-2 px-2 py-1 rounded-sm hover:bg-[#161616] cursor-pointer flex content-center items-center gap-4">
            <RxGear />
            Settings
          </li>
          <li className="my-2 px-2 py-1 rounded-sm hover:bg-[#161616] cursor-pointer flex content-center items-center gap-4">
            <RxGithubLogo />
            Source
          </li>
        </div>
      </ul>
    </div>
  );
};
