import {
  PlusCircleIcon,
  ArrowPathIcon, 
  EllipsisVerticalIcon,
  ClockIcon
} from "@heroicons/react/24/solid";

const DashboardNavigation = ({ onAddWidget, onRefresh, onMenu, onFilter }) => {
  return (
    <div className="flex flex-row justify-between p-3 bg-gray-100 shadow-md">
      <div className="p-4">
        <h2 className="font-semibold text-lg text-purple-800">
          CNAPP DASHBOARD
        </h2>
      </div>
      <div className="flex justify-between gap-3">
        <button
          onClick={onAddWidget}
          className="h-10 bg-white text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded flex items-center gap-2"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Add Widget
        </button>
        <button
          onClick={onRefresh}
          className="h-10 bg-white text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded flex items-center gap-2"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onMenu}
          className="h-10 bg-white text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded flex items-center gap-2"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
          
        </button>
        <button
          onClick={onFilter}
          className="h-10 bg-white text-purple-800 font-semibold py-2 px-4 border border-gray-400 rounded flex items-center gap-2"
        >
          <ClockIcon className="h-5 w-5" /> |
          Filter
        </button>
      </div>
    </div>
  );
};

export default DashboardNavigation;
