import axios from "axios";

// this helper function takes the results of the first API call and returns an array of formatted objs to be used in the second API call (see addDetailsToRestaurantObjs below)
export function createRestaurantObjs(results) {
  const arrayOfResults = results.data.results;

  const arrayOfRestaurantObjs = [];

  for (let restaurant of arrayOfResults) {
    if (restaurant.business_status === "OPERATIONAL") {
      arrayOfRestaurantObjs.push({
        place_id: restaurant.place_id,
      });
    }
  }
  return arrayOfRestaurantObjs;
}

// this helper function assists the addDetailsToRestaurantObjs helper function below to reformat the existing restaurant objs (which only have place_id) to contain a suite of additional information from the API call (placeDetails)
function updateRestaurantObj(restaurant, placeDetails) {
  restaurant.business_hours = placeDetails.opening_hours.weekday_text;
  restaurant.phone_number = placeDetails.formatted_phone_number;
  restaurant.maps_directions = placeDetails.url;
  restaurant.website = placeDetails.website;
  restaurant.restaurant_name = placeDetails.name;
  restaurant.ave_rating = placeDetails.rating;
  restaurant.restaurant_photo_ref = placeDetails.photos[0].photo_reference;
  restaurant.restaurant_photo_width = placeDetails.photos[0].width;
  restaurant.formatted_address = placeDetails.formatted_address;
  restaurant.user_ratings_total = placeDetails.user_ratings_total;
  restaurant.price_level = placeDetails.price_level;
  restaurant.open_now = placeDetails.opening_hours.open_now;
  return restaurant;
}

export async function addDetailsToRestaurantObjs(createdRestObjs) {
  //const url = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/details/json?";
  const url = "https://infinite-ridge-26379.herokuapp.com/polls/resultsdetails"
  //const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const updatedObjs = [];
  const promises = [];

  for (const restaurant of createdRestObjs) {
    // we are using the place_id contained in each restaurant obj to make an individual API call per obj
    const restaurantId = restaurant.place_id;
    // const params = {
    //   place_id: restaurantId,
    //   key: apiKey,
    // };
    // each promise contains an individual API call (as the initial one did not give us all the information we required) followed by data formatting into useable objects for our display and save purposes
    promises.push(
      axios.post(url, { place_id: restaurantId }).then((response) => {
        console.log("line53 response", response);
        const placeDetails = response.data.result;
        // this helper function actually does the formatting of each restaurant obj to contain the new information pulled from each API call
        updatedObjs.push(updateRestaurantObj(restaurant, placeDetails));
      })
    );
  }
  // here we are awaiting the resolution of all promises prior to returning an array containing all properly formatted restaurant objects
  return await Promise.all(promises)
    .then(() => {
      return updatedObjs;
    })
    .catch((err) => {
      console.log(err);
    });
}
