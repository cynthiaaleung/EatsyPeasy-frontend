import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from 'react';
import { getWinningRestaurant } from '../helpers/getWinningRestaurant';
import axios from 'axios';
import useInterval from '../hooks/useInterval';
import BusinessHours from './SingleResult_Comps/BusinessHours';
import "../styles/PollingResults.scss";

export default function PollingResults(props) {
  const [pollData, setPollData] = useState(false);
  const [usersData, setUsersData] = useState(false);
  const [winningRestaurant, setWinningRestaurant] = useState(false);
  const { alpha_numeric_id } = useParams();
  
  // function used to make API calls in order to dynamically update our components
  const pollApiCall = () => axios({
    method: 'get', //need to update this to GET the 3 rest objs to populate this page
    url: `https://infinite-ridge-26379.herokuapp.com/polls/show/${alpha_numeric_id}/results`, //make sure to point this to backend
  })
  .then((response) => {
    setPollData(response.data.poll);
    setUsersData(response.data.users);
    return response.data.poll;
  })
  .then((pollData) => {
    const topRestaurant = getWinningRestaurant(pollData);
    setWinningRestaurant(topRestaurant);
  })
  .catch((error) => {
    console.log(error);
  });
  
  // this useEffect fetches our first batch of data before the refreshes below
  useEffect(() => {
    pollApiCall();
  }, [])
  
  // useInterval custom hook - refreshes our data via fresh API calls without causing memory leaks
  useInterval(pollApiCall, 3000)
  
  const data = {
    labels: [ pollData.restaurant_1_name, pollData.restaurant_2_name, pollData.restaurant_3_name],
    datasets: [
      {
        label: 'Votes',
        data: [pollData.restaurant_1_votes, pollData.restaurant_2_votes, pollData.restaurant_3_votes],
        options: {
          plugins: {
            legend: {
              labels: {
                display: "none",
              }
            },
            font: {
              family: 'Quicksand',
              size: 30,
            }
          }
        },
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scales: {
      x: {
          ticks: {
              stepSize: 1
          }
      }
    },
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Restaurant Voting Results',
      },
    },
    maintainAspectRatio: false
  };

return(
  <Fragment>
    {winningRestaurant && 
      <div className="poll-results">
        <Bar 
          data={data} 
          options={options} 
          height={400}
        >
        </Bar>
      </div>
    }
    <br />
    {winningRestaurant && 
      <div className="winning-result-info">
        <h2>{winningRestaurant.restaurant_name}</h2>
        <div className="leading-choice-information">
          <div id="business-hours">
          <h3>Business Hours:</h3>
            <BusinessHours business_hours={winningRestaurant.business_hours}></BusinessHours>
          </div>
          <div id="contact-information">
            <h3>Contact Information:</h3>
            <h4>{winningRestaurant.phone_number || "No number available"}</h4>
            <h4>
              <a 
                href={winningRestaurant.website} 
                target="_blank" 
                rel="noreferrer"
              >
                {winningRestaurant.website || "No website available"}
              </a>
            </h4>
          </div>
          <div id="directions">
            <h3>Directions:</h3>
            <h4>
              <a href={winningRestaurant.maps_directions} 
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
            </h4>
          </div>
        </div>
      </div>}
  </Fragment>
);  
}

