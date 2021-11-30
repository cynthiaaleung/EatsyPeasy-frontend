import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPrice, getQuery } from "../helpers/GooglePlacesAPIFunctions";
import {
  createRestaurantObjs,
  addDetailsToRestaurantObjs,
} from "../helpers/CreateRestaurantObjs";
import axios from "axios";
import SingleResult from "./SingleResult";
import Button from '@mui/material/Button';
import LinearIndeterminate from "./LoadingBar";
import Box from '@mui/material/Box';
import generateRandomString from "../helpers/UniqueLink";
import "../styles/Results.scss";

export default function Results(props) {

  const navigate = useNavigate();

  const [itemData, setItemData] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  useEffect(() => {
    const range = getPrice(props.answers.answerThree);
    const query = getQuery(props.answers.answerOne, props.answers.answerTwo);

    //API cors proxy that works (for our project scale):
    const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
      // "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/textsearch/json?";
    const params = {
      query: query,
      minprice: range[0],
      maxprice: range[1],
      key: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    };
    
    // initial call to the google places text search API - fetches up to 20 records in one go
    axios
      .get(url, { params })
      .then(function (response) {
        // this helper function returns an array of up to 20 objs (based on what was returned in the API call) containing the place_id key needed for our second API call
        const createdRestObjs = createRestaurantObjs(response);
        return createdRestObjs;
      })
      .then((createdRestObjs) => {
        // this helper function takes the array of objs above and makes an API call per obj to then populate each with the additional keys and information needed for our singleresult components below
        const updatedObjs = addDetailsToRestaurantObjs(createdRestObjs);
        return updatedObjs;
      })
      .then(function (updatedObjs) {
        // here we are setting the itemData state to house the array of properly formatted restaurant objs (now containing all information) 
        setItemData(updatedObjs);
        // here we are setting the initial selectedRestaurants state to contain the first 3 restaurant objs (for display purposes in the singleresult components below)
        setSelectedRestaurants([updatedObjs[0], updatedObjs[1], updatedObjs[2]]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [poll, setPoll] = useState(null);

  // this axios call actually creates a poll record in our polls table within the postgresql db - triggered by the button component at the bottom of the page
  useEffect(() => {
    if (poll) {
    axios({
      method: 'post',
      url: 'https://infinite-ridge-26379.herokuapp.com/polls/create',
      data: poll
    })
    .then(()=>{
      // upon creating the poll record, you are then redirected to the linkpage
      navigate('/linkpage', { state: {poll: poll} });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  }, [poll])

  // this numericId is what becomes the alpha_numeric_id shown on each poll (and what you use to access each poll as well)
  const numericId = generateRandomString();
  
  // this function actually creates the properly formatted poll obj that we use to create our poll record in our db
  function createPoll (selectedRestaurants) {
    const poll = {};

    // our attempt at making this part of the code DRYer as we need each key for all 3 restaurants (1, 2, 3)
    for (let i = 0; i < selectedRestaurants.length; i++) {
      const restPlaceID = `restaurant_${i+1}_place_id`;
      const restName = `restaurant_${i+1}_name`;
      const restVotes = `restaurant_${i+1}_votes`;
      const restHours = `restaurant_${i+1}_business_hours`;
      const restNumber = `restaurant_${i+1}_phone_number`;
      const restWebsite = `restaurant_${i+1}_website`;
      const restMaps = `restaurant_${i+1}_maps_directions`;
      
      poll[restPlaceID] = selectedRestaurants[i].place_id;
      poll[restName] = selectedRestaurants[i].restaurant_name;
      poll[restVotes] = 0;
      // the business_hours are housed in an array hence the JSON string here
      poll[restHours] = JSON.stringify(selectedRestaurants[i].business_hours);
      poll[restNumber] = selectedRestaurants[i].phone_number;
      poll[restWebsite] = selectedRestaurants[i].website; 
      poll[restMaps] = selectedRestaurants[i].maps_directions;
    }
    
    poll["alpha_numeric_id"] = numericId;
    return poll;
  }

  // visual components + conditional rendering for all 3 singleresult display components + the loading bar aka LinearIndeterminate component
  return (
    <Fragment>
      <div className="page-number-display">
        4 of 4
      </div>
      <div className="results-title">
        {selectedRestaurants.length > 0 && <h1>Your Customized Selections</h1>}
      </div>
      <div className="single-result-stacks">
        {(itemData[0] && selectedRestaurants.length > 0) && <SingleResult itemData={itemData} defaultValue={0} selectedRestaurants={selectedRestaurants} setSelectedRestaurants={setSelectedRestaurants} parentComponent="Results"/>}
        {(itemData[1] && selectedRestaurants.length > 0) &&  <SingleResult itemData={itemData} defaultValue={1} selectedRestaurants={selectedRestaurants} setSelectedRestaurants={setSelectedRestaurants} parentComponent="Results"/>}
        {(itemData[2] && selectedRestaurants.length > 0) && <SingleResult itemData={itemData} defaultValue={2} selectedRestaurants={selectedRestaurants} setSelectedRestaurants={setSelectedRestaurants} parentComponent="Results"/>}
        {selectedRestaurants.length === 0 && <LinearIndeterminate />}
      </div>

       {selectedRestaurants.length > 0 && <Box textAlign='center' padding={5}>
        <h3 id="generate-poll-text">Need some input? Generate a poll to share with your friends!</h3>
        <Button 
            style={{backgroundColor: "#0198E1", fontFamily: 'Quicksand, sans-serif'}} variant="contained" 
            onClick={() => {const pollObj = createPoll(selectedRestaurants); setPoll(pollObj); 
            //trigger to do POST request
            }}>Generate Poll
        </Button>
      </Box>}
    </Fragment>
 )
}