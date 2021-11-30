import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup(props) {
  const [checkboxState, setCheckboxState] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
  });

  const handleChange = (event) => {
    const checkboxName = event.target.name;

    // handles the actual visual "check" and updates the state to true or false accordingly (this happens async)
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });

    // because the setCheckboxState operation is async, we're checking for the OPPOSITE boolean in each case
    if (checkboxState[checkboxName] === false) {
      if (checkboxName === "vegan") {
        props.onCheck("vegan");
      } else if (checkboxName === "vegetarian") {
        props.onCheck("vegetarian");
      } else if (checkboxName === "glutenFree") {
        props.onCheck("gluten free");
      }
    } else {
      if (checkboxName === "vegan") {
        props.onUncheck("vegan");
      } else if (checkboxName === "vegetarian") {
        props.onUncheck("vegetarian");
      } else if (checkboxName === "glutenFree") {
        props.onUncheck("gluten free");
      }
    }
  };

  const { vegan, vegetarian, glutenFree } = checkboxState;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel style={{fontFamily: 'Quicksand, sans-serif'}} component="legend">Dietary Preferences</FormLabel>
        <FormGroup >
          <FormControlLabel
            control={
              <Checkbox checked={vegan} onChange={handleChange} name="vegan" />
            }
            label={<div style={{ fontFamily: 'Quicksand, sans-serif' }}>{"Vegan Options"}</div>}
          />
          <FormControlLabel
            control={
              <Checkbox checked={vegetarian} onChange={handleChange} name="vegetarian" />
            }
            label={<div style={{ fontFamily: 'Quicksand, sans-serif' }}>{"Vegetarian Options"}</div>}
          />
          <FormControlLabel
            control={
              <Checkbox checked={glutenFree} onChange={handleChange} name="glutenFree" />
            }
            label={<div style={{ fontFamily: 'Quicksand, sans-serif' }}>{"Gluten-Free Options"}</div>}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}