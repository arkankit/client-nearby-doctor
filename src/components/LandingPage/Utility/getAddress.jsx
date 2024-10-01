
async function getUserAddress(latitude, longitude){
    try{
      //using fetch api to get the reverse geocoded address of the user by sending the lat long recieved as prop from the parent GoogleMapComp
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
    const data = await response.json();
    //if the data is present i.e results array length is more than 0 then return the users human readable address
    if(data.results.length > 0){
      return data.results[0].formatted_address;
    }
    else{
      return "No address found"
    }
  }
  catch(e){
    console.log(e);
  }
  }

  export default getUserAddress;
