import React from 'react';
import SearchIcon from '../../assets/SearchIcon.svg';

const SearchField = (props) => {
  return (
    <>
      <input
        type="text"
        className="search_input"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <img src={SearchIcon} alt="" className="search_icon" />
    </>
  );
};

export default SearchField;
