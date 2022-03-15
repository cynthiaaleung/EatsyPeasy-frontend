import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { organizePollJSON } from "../helpers/organizePollJSON";
import { addDetailsToRestaurantObjs } from "../helpers/CreateRestaurantObjs";
import axios from "axios";
import SingleResult from "./SingleResult";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearIndeterminate from "./LoadingBar";
import "../styles/PollingPage.scss";

export default function PollingPage(props) {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [userName, setUserName] = useState("");
  const { alpha_numeric_id } = useParams();

  useEffect(() => {
    axios({
      method: 'get', //need to update this to GET the 3 rest objs to populate this page
      url: `https://infinite-ridge-26379.herokuapp.com/polls/show/${alpha_numeric_id}`, //make sure to point this to backend
    })
    .then((response) => {
      //add a function to oragnize the incoming poll data array
      const createdRestObjs = organizePollJSON(response);
      //and make the get call for details and photo etc
      const updatedObjs = addDetailsToRestaurantObjs(createdRestObjs);
      return updatedObjs;
    })
    .then((updatedObjs)=> {
      setSelectedRestaurants(updatedObjs);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <Fragment>
      <div className="page-number-display">
        4 of 4
      </div>
      <div className="polling-page-title">
        {selectedRestaurants.length > 0 && <h1>Your Restaurant Selections</h1>}
      </div>
      <div className="single-result-stacks">
        {selectedRestaurants[0] && 
          <SingleResult 
            itemData={""} 
            defaultValue={0} 
            selectedRestaurants={selectedRestaurants} 
            setSelectedRestaurants={setSelectedRestaurants} 
            parentComponent="PollingPage" 
            userName= {userName} 
            alpha_numeric_id={alpha_numeric_id}
          />
        }
        {selectedRestaurants[1] && 
          <SingleResult 
            itemData={""} 
            defaultValue={1} 
            selectedRestaurants={selectedRestaurants} 
            setSelectedRestaurants={setSelectedRestaurants} 
            parentComponent="PollingPage" 
            userName= {userName} 
            alpha_numeric_id={alpha_numeric_id}
          />
        }
        {selectedRestaurants[2] && 
          <SingleResult 
            itemData={""} 
            defaultValue={2} 
            selectedRestaurants={selectedRestaurants} 
            setSelectedRestaurants={setSelectedRestaurants} 
            parentComponent="PollingPage" 
            userName= {userName} 
            alpha_numeric_id={alpha_numeric_id}
          />
        }
        {selectedRestaurants.length === 0 && <LinearIndeterminate />}
      </div>
      {selectedRestaurants.length > 0 && 
        <Box
          component="form"
          sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
          autoComplete="off"
          textAlign='center' 
          padding={5}
        >
        {selectedRestaurants.length > 0 && 
          <h3 id="choose-text">
            Enter your name and click one of the choices above that you are craving!
          </h3>
        }
        {<TextField 
            value={userName} 
            onChange={(event) => setUserName(event.target.value)} 
            InputLabelProps={{style: {fontFamily: 'Quicksand, sans-serif'}}} 
            fullWidth id="input-with-sx" 
            label="Identify Yourself :)"
            variant="outlined"
            error={userName === ""}
            helperText={userName === "" ? 'Name is required' : ' '}
          />
        }
        </Box>
      }
    </Fragment>
 )
}

// rest of the logic is on SingleResult component as it is used conditionally for both PollingPage and Results depending on the "parentComponent" prop that is passed