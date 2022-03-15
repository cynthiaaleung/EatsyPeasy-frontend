import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPhotoUrl } from "../helpers/GetRestaurantPhotoUrl";
import { getPriceIcon } from "../helpers/getPriceIcon";
import { styled } from '@mui/material/styles';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import BusinessHours from "./SingleResult_Comps/BusinessHours";
import Button from '@mui/material/Button';
import "../styles/SingleResult.scss";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  fontFamily: 'Quicksand, sans-serif'
}));

export default function SingleResult(props) {
  const navigate = useNavigate();

  const { itemData, defaultValue, selectedRestaurants, setSelectedRestaurants, parentComponent, userName, alpha_numeric_id } = props;

  const selectedRestaurant = selectedRestaurants[defaultValue];

  const imageUrl = getPhotoUrl(selectedRestaurant);
  
  const [selectedIndex, setSelectedIndex] = useState(defaultValue);
  const [pollVote, setPollVote] = useState(null);
  
  // this handles onChange in the Select component (dropdown list)
  const handleChange = (event) => {
    const newSelectedRestaurants = [...selectedRestaurants];
    
    newSelectedRestaurants[defaultValue] = itemData[event.target.value];
    setSelectedIndex(event.target.value);    
    setSelectedRestaurants(newSelectedRestaurants);
  };
  
  // this axios call updates poll record with the selected restaurant and username information, triggered by button component
  useEffect(() => {
    if (pollVote && userName) {
      axios({
        method: 'post',
        url: 'https://infinite-ridge-26379.herokuapp.com/polls/update',
        data: {
          place_id: selectedRestaurant.place_id,
          vote: `restaurant_${defaultValue+1}_votes`,
          name: userName,
          alpha_numeric_id: alpha_numeric_id
        }
      })
      .then(()=>{
        // after updating the poll record, navigate to polling results page
        navigate(`/poll/${alpha_numeric_id}/results`);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [pollVote])

  return (
    <div className="column">
      <Stack
        direction="column"
        spacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Item>
          {(parentComponent === "PollingPage") && 
          <Item>
            <h3>{selectedRestaurant.restaurant_name}</h3>
          </Item>}
          {(parentComponent === "Results") && 
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Choice {defaultValue + 1}</InputLabel>
                <Select
                  id="restaurant-simple-select"
                  label="Restaurant"
                  value={selectedIndex}
                  onChange={handleChange}
                  style={{fontFamily: 'Quicksand, sans-serif'}}>
                {itemData.map((item, index) => {
                  return <MenuItem key={index} value={index}>{item.restaurant_name}</MenuItem>
                })}
                </Select>
              </FormControl>
            </Box>
          }
          <img src={imageUrl} alt={"restaurant"} className="restaurant-image"/>
        </Item>
        <Item>        
          <h4> Rating: {selectedRestaurant.ave_rating} - 
          <Rating 
            className="rating" 
            name="read-only" 
            defaultValue={selectedRestaurant.ave_rating} 
            precision={0.25} 
            readOnly 
          /> 
          - {selectedRestaurant.user_ratings_total} Reviews - {getPriceIcon(selectedRestaurant.price_level)}
          </h4>
        </Item>
        <Item>
          <h3>Business Hours:</h3>
          {selectedRestaurant.open_now && 
            <h4>Status:
              <img className="open-sign" src='https://img.icons8.com/color/48/000000/open-sign.png' alt="open" />
            </h4>}
          {!selectedRestaurant.open_now && 
            <h4>Status:
              <img className="open-sign" src='https://img.icons8.com/fluency/48/000000/closed-sign.png' alt="closed" />
            </h4>}
          <BusinessHours business_hours={selectedRestaurant.business_hours}></BusinessHours>
          <h3>Contact Information:</h3>
          <h4>{selectedRestaurant.phone_number || "No phone number available"}</h4>
          <h4>
            <a 
              href={selectedRestaurant.website} 
              target="_blank" 
              rel="noreferrer"
            >
              {selectedRestaurant.website || "No website available"}
            </a>
          </h4>
          <h3>Directions:</h3>
          <h4>
            <a 
              href={selectedRestaurant.maps_directions} 
              target="_blank" 
              rel="noreferrer"
            >
              <img 
                className="maps_icon" 
                src="https://www.google.com/images/branding/product/2x/maps_96in128dp.png" 
                alt="map-icon" 
                width="50" 
                height="50"
              />
            </a> 
            {selectedRestaurant.formatted_address}
          </h4>
        </Item>
        {(parentComponent === "PollingPage") && 
          <Button 
            style={{backgroundColor: "#0198E1", fontFamily: 'Quicksand, sans-serif'}} 
            variant="contained" 
            onClick={() => {setPollVote(selectedRestaurant.place_id);}}
          >
            I Choose you!
          </Button>
        }
      </Stack>
    </div>
  )
}