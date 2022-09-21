import React from 'react';
import SearchInput from "react-search-input";
import "../../css/Component/SearchInput.css";
import SearchIcon from '../../assets/SearchIcon.svg';

const SearchField = ({setSearch, search, className}) => {
    const handleSearch = (text) => {
        setSearch(text);
      }
  return (
    <>
        <SearchInput className={`${className} search-input`} onChange={handleSearch} />
        <img src={SearchIcon} alt="" className="search-input-icon" />
    </>

  )
}

export default SearchField;