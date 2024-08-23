import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery, performSearch, clearSearch } from "./combineSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.combine.searchQuery);

  const handleSearch = () => {
    dispatch(performSearch());
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 p-2 justify-between bg-white">
        <div className="flex flex-row gap-3 justify-center">
          <h3 className="text-gray-500 cursor-pointer">Home &gt;</h3>
          <h3>Dashboard</h3>
        </div>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Search Anything"
            className="px-2 py-1 w-[400px] bg-gray-100"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClearSearch}>Clear</button>
        </div>
      </div>

      
    </div>
  );
};

export default Navbar;
