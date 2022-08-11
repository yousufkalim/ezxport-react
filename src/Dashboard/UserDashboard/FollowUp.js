import React from 'react';
import { Link } from "react-router-dom";
import ListOfRequests from '../../components/UderDashboard/ListOfRequests';

function createData(name, calories, fat, carbs, protein, protein2) {
  return { name, calories, fat, carbs, protein, protein2 };
}
const rows = [
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
];

const FollowUp = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">List of requests</h1>
            <Link className="list_reqst_btn" to="/User/RequestForm">
              Create a request
            </Link>
          </div>
          {/* list table   */}
          <div className="list_table">
            <ListOfRequests rows={rows} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowUp;
