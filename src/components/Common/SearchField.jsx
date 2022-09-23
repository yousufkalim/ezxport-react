import React from "react";
import SearchInput from "react-search-input";
import "../../css/Component/SearchInput.css";
import SearchIcon from "../../assets/SearchIcon.svg";
import { useTranslation } from "react-i18next";

const SearchField = ({ setSearch, search, className, placeholder }) => {
  const { t } = useTranslation();

  const handleSearch = (text) => {
    setSearch(text);
  };
  return (
    <>
      <SearchInput
        placeholder={t(placeholder)}
        className={`${className} search-input`}
        onChange={handleSearch}
      />
      <img src={SearchIcon} alt="" className="search-input-icon" />
    </>
  );
};

export default SearchField;
