import FilterList from "./FilterList";
export default function Sidebar() {
  return (
    <div>
      <div className="w-[336px] rounded-md border border-slate-200 flex-col">
        <div className="w-[335px] h-[45px] p-3 bg-slate-100 rounded-tl-md rounded-tr-md border-b border-slate-200 items-center gap-2.5 inline-flex">
          <div className="text-right text-gray-900 text-sm leading-[21px]">
            سوالات من
          </div>
        </div>
        <FilterList />
        </div>
      </div>

  );
}
