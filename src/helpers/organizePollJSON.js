//returns an array of the 3 restaurant objects (each with a place_id)
export function organizePollJSON (response) {
  const createdRestObjs = [];
  createdRestObjs.push({place_id: response.data[0].restaurant_1_place_id});
  createdRestObjs.push({place_id: response.data[0].restaurant_2_place_id});
  createdRestObjs.push({place_id: response.data[0].restaurant_3_place_id});
  return createdRestObjs;
}