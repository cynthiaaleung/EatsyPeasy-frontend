//used to get create the URL to display photo (via API get call)
export function getPhotoUrl(restaurantObj) {
  const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${restaurantObj.restaurant_photo_ref}&maxwidth=${restaurantObj.restaurant_photo_width}&key=${apiKey}`;
  return url;
}
