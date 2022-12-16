import { useSelector } from "react-redux";
import Filter from "./Filter";
import Card from "./Card";

export default () => {
  const notes = useSelector((state) => state.notes.notes);

  return (
    <div>
      <div className="text-xl font-bold text-center">
        Notes{" "}
        <span className="text-sm text-gray-500">
          {notes.length > 0 && notes.length}
        </span>
      </div>
      <div className="text-sm text-gray-300 text-center">
        Several collection of <span className="font-bold underline">class</span>{" "}
        notes with no really value.
      </div>
      <div className="toolbar">
        <Filter notes={notes} />
      </div>
      <div className="w-full my-3 flex flex-wrap justify-center content-center items-center gap-5">
        {notes.length > 0
          ? notes.map((note, i) => <Card {...note} key={i} />)
          : "There is no notes please add one"}
      </div>
    </div>
  );
};
