import Modal from "./Modal";
import { RxCalendar, RxPencil1 } from "react-icons/rx";
import { useRouter } from "next/router";

export default ({ id, name, description, date, user }) => {
  const router = useRouter();

  return (
    <div
      className="bg-[#161616bf] p-2 rounded-md w-auto h-36 flex flex-col justify-between cursor-pointer border border-transparent hover:border-gray-400 hover:bg-[#161616]"
      onClick={() => router.push(`notes/${id}`)}
    >
      <div className="font-bold border-b border-gray-500 capitalize flex justify-between content-center items-center py-1">
        {name}
        <div onClick={(e) => e.stopPropagation()}>
          <Modal id={id} name={name} description={description}>
            <RxPencil1 />
          </Modal>
        </div>
      </div>
      <div className="text-gray-400 text-sm">{description}</div>
      <div className="tags inline-flex gap-4">
        {["Maths", "Science", "Programation"].map((tag, i) => (
          <div className="bg-violet-900 p-1 rounded-md text-xs italic" key={i}>
            {tag}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-400 inline-flex content-center items-center gap-1">
        <RxCalendar /> {date} by {user}
      </div>
    </div>
  );
};
