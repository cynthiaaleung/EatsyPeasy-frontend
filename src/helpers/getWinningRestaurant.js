export function getWinningRestaurant(pollData) {
  let winningRestaurant = {};

  const restVotesObjs = {
    1: pollData.restaurant_1_votes,
    2: pollData.restaurant_2_votes,
    3: pollData.restaurant_3_votes,
  };
  //finds restaurant with greatest amount of votes. If a tie, choose the "first one"
  const winningRestaurantKey = Object.keys(restVotesObjs).reduce((a, b) =>
    restVotesObjs[a] >= restVotesObjs[b] ? a : b
  ); 

  winningRestaurant = {
    restaurant_name: pollData[`restaurant_${winningRestaurantKey}_name`],
    business_hours: pollData[`restaurant_${winningRestaurantKey}_business_hours`],
    phone_number: pollData[`restaurant_${winningRestaurantKey}_phone_number`],
    maps_directions: pollData[`restaurant_${winningRestaurantKey}_maps_directions`],
    website: pollData[`restaurant_${winningRestaurantKey}_website`]
  };
  return winningRestaurant;
}
