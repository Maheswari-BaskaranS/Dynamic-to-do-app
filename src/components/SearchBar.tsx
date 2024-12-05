import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setFilterText } from "../features/tasks/taskSlice";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);
    dispatch(setFilterText(text));
  };

  return (
    <input
      type="text"
      value={searchText}
      onChange={handleSearch}
      placeholder="Search tasks..."
      className="w-full p-2 border rounded-md"
    />
  );
};

export default SearchBar;


