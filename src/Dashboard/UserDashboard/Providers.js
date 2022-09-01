import React from 'react';
import SearchIcon from '../../assets/SearchIcon.svg';
import TableComponent from '../../components/Common/TableComponent';
import DotedIcon from '../../assets/DotedIcon.svg';
import TitleDownArrow from '../../assets/TitleDownArrow.svg';

const Data = [
  {
    heading: 'Service providers',
    imgSrc: TitleDownArrow,
    ServiceProviders: 'AP plus',
    contact: 'Darrell Steward',
    AssociatedCountries: 'Ivory Coast, Cameroon, Gabon',
    Icon: DotedIcon,
  },
  {
    heading: 'Contact',
    ServiceProviders: 'AP Dillon',
    contact: 'Darrell Steward',
    AssociatedCountries: 'Ivory Coast, Cameroon, Gabon',
    Icon: DotedIcon,
  },
  {
    heading: 'Associated countries',
    ServiceProviders: 'AP plus',
    contact: 'Darrell Steward',
    AssociatedCountries: 'Ivory Coast, Cameroon, Gabon',
    Icon: DotedIcon,
  },
  {
    heading: '',
    ServiceProviders: 'AP plus',
    contact: 'Darrell Steward',
    AssociatedCountries: 'Ivory Coast, Cameroon, Gabon',
    Icon: DotedIcon,
  },
];
const Providers = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div">
            <h1 className="list_h1">Service providers</h1>
            <div className="searching">
              <input type="text" className="search_input" placeholder="To Search" />
              <img src={SearchIcon} alt="" className="search_icon" />
            </div>
          </div>
          <TableComponent
            Data={Data}
            // Icons={false}
          />
        </div>
      </div>
    </>
  );
};
export default Providers;
