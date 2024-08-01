import { useContext } from "react";
import PaginationContext from "../Context/PaginationContext";

export default function Pagination() {
  const { pageNo, handleNext, handlePrev } = useContext(PaginationContext);
  return (
    <div className="flex justify-center	gap-8 text-3xl h-[4rem] w-screen bg-slate-400 items-center">
      <div onClick={handlePrev} className="cursor-pointer">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div>{pageNo}</div>
      <div onClick={handleNext} className="cursor-pointer">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}
