import axios from "axios";


async function getLatLng(address_place_id){
    console.log("lat lng func called with place place id:", address_place_id);
    try {
        const response = await axios.get("https://server-nearby-doctor-production.up.railway.app/api/autocomplete", {
            params : {
                placeID : address_place_id,
            },
          });
      if(response.data){
        return(response.data.result.geometry.location);
      }
    } catch (err) {
      console.error("Error fetching lat lng of user:", err);
    }
  }

  export default getLatLng;