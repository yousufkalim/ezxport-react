import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function MultipleSelectCheckmarks(props) {



  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          sx={{
            height: "2.9rem !important",
          }}
          name={props.name}
          disabled={props.disabled}
          multiple
          value={props.value}
          onChange={props.onChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {props.names.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                <Checkbox checked={props?.select?.indexOf(item) > -1} />
                <ListItemText primary={item} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}