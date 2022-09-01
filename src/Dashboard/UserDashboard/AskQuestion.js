import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const AskQuestion = () => {
  const [dropdown, setDropdown] = React.useState('default');

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Poser une question</h1>
          </div>
          {/* list table   */}
          <div className="question_form">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <label htmlFor="" className="question_label">
                  Your question is related to
                </label>
                <Select id="demo-simple-select" defaultValue={dropdown} onChange={handleChange}>
                  <MenuItem value="default">A demand</MenuItem>
                  <MenuItem value={10}>A demand</MenuItem>
                  <MenuItem value={20}>A demand</MenuItem>
                  <MenuItem value={30}>A demand</MenuItem>
                </Select>
                <br />
              </FormControl>
              <FormControl fullWidth>
                <label htmlFor="" className="question_label">
                  Select request
                </label>
                <Select id="demo-simple-select" defaultValue={dropdown} onChange={handleChange}>
                  <MenuItem value="default">Application Title – Date</MenuItem>
                  <MenuItem value={10}>Application Title – Date</MenuItem>
                  <MenuItem value={20}>Application Title – Date</MenuItem>
                  <MenuItem value={30}>Application Title – Date</MenuItem>
                </Select>
                <br />
              </FormControl>
              <FormControl fullWidth>
                <label htmlFor="" className="question_label">
                  Description
                </label>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={10}
                  placeholder="Description of your request"
                  style={{ padding: '10px' }}
                />
                <br />
              </FormControl>
              <button className="quiz_btn">Ask the question</button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
