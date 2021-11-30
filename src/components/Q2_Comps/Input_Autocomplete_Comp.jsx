import * as React from 'react';
import { Fragment, useState } from "react";
import { createFilterOptions } from '@mui/base';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo(props) {

  // this is the exact number of auto-complete options to be displayed
  const OPTIONS_LIMIT = 5;
  const defaultFilterOptions = createFilterOptions();
  
  // this filter limits the amount of auto-complete options showing at any given time (there were just too many otherwise)
  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("")

  return (
    <Fragment>
    <Stack spacing={1} sx={{ width: 320 }}>
      <Autocomplete
        id="food-category"
        filterOptions={filterOptions}
        freeSolo
        options={restaurantCategories.map((option) => option)}
        onChange={(event, newValue) => {
          props.onClick(newValue);
          setValue(newValue);
        }}
        value={value}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        inputValue={inputValue}
        renderInput={(params) => <TextField {...params} label="What type of food are you craving?" InputLabelProps={{style: {fontFamily: 'Quicksand, sans-serif'}}} />}
      />
    </Stack>
    </Fragment>
  );
}

// this array contains all of the auto-complete food categories being displayed
const restaurantCategories = [
  "Afghan",
  "African",
  "Senegalese",
  "South African",
  "American (New)",
  "American (Traditional)",
  "Arabian",
  "Argentine",
  "Armenian",
  "Asian Fusion",
  "Australian",
  "Austrian",
  "Bangladeshi",
  "Bar",
  "Barbeque",
  "Basque",
  "Belgian",
  "Brasseries",
  "Brazilian",
  "Breakfast & Brunch",
  "Pancakes",
  "British",
  "Buffets",
  "Bulgarian",
  "Burgers",
  "Burmese",
  "Cafes",
  "Themed Cafes",
  "Cafeteria",
  "Cajun/Creole",
  "Cambodian",
  "Caribbean",
  "Dominican",
  "Haitian",
  "Puerto Rican",
  "Trinidadian",
  "Catalan",
  "Cheesesteaks",
  "Chicken Shop",
  "Chicken Wings",
  "Chinese",
  "Cantonese",
  "Dim Sum",
  "Hainan",
  "Shanghainese",
  "Szechuan",
  "Comfort Food",
  "Creperies",
  "Cuban",
  "Czech",
  "Delis",
  "Diners",
  "Dinner Theater",
  "Eritrean",
  "Ethiopian",
  "Fast Food",
  "Filipino",
  "Fish & Chips",
  "Fondue",
  "Food Court",
  "Food Stands",
  "French",
  "Mauritius",
  "Reunion",
  "Game Meat",
  "Gastropubs",
  "Georgian",
  "German",
  "Gluten-Free",
  "Greek",
  "Guamanian",
  "Halal",
  "Hawaiian",
  "Himalayan/Nepalese",
  "Honduran",
  "Hong Kong Style Cafe",
  "Hot Dogs",
  "Hot Pot",
  "Hungarian",
  "Iberian",
  "Indian",
  "Indonesian",
  "Irish",
  "Italian",
  "Calabrian",
  "Sardinian",
  "Sicilian",
  "Tuscan",
  "Japanese",
  "Conveyor Belt Sushi",
  "Izakaya",
  "Japanese Curry",
  "Ramen",
  "Teppanyaki",
  "Kebab",
  "Korean",
  "Kosher",
  "Laotian",
  "Latin American",
  "Colombian",
  "Salvadoran",
  "Venezuelan",
  "Live/Raw Food",
  "Malaysian",
  "Mediterranean",
  "Falafel",
  "Mexican",
  "Tacos",
  "Middle Eastern",
  "Egyptian",
  "Lebanese",
  "Modern European",
  "Mongolian",
  "Moroccan",
  "New Mexican Cuisine",
  "Nicaraguan",
  "Noodles",
  "Pakistani",
  "Pan Asia",
  "Persian/Iranian",
  "Peruvian",
  "Pizza",
  "Polish",
  "Polynesian",
  "Pop-Up Restaurants",
  "Portuguese",
  "Poutineries",
  "Russian",
  "Salad",
  "Sandwiches",
  "Scandinavian",
  "Scottish",
  "Seafood",
  "Singaporean",
  "Slovakian",
  "Somali",
  "Soul Food",
  "Soup",
  "Southern",
  "Spanish",
  "Sri Lankan",
  "Steakhouses",
  "Supper Clubs",
  "Sushi",
  "Syrian",
  "Taiwanese",
  "Tapas Bars",
  "Tapas/Small Plates",
  "Tex-Mex",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Uzbek",
  "Vegan",
  "Vegetarian",
  "Vietnamese",
  "Waffles",
  "Wraps"
  ]