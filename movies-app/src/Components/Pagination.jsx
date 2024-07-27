export default function Pagination({ pageNo, handleNext, handlePrev }) {
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
