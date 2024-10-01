import axios from "axios";

async function getDoctorsBySpeciality(chosenSpeciality){
    try{
        const response = await axios.post("http://localhost:3000/doctorsBySpeciality", {chosenSpeciality});
        if(response.data.noDocsFound){
            return ([]); // return empty array if no results were found
        } else {
            return (response.data.filteredDoctorsArray); // else return the filtered doctors array fetched from db
        }
        
    } catch (error) {
        console.log("Error contacting db to fetch filtered doctors:", error);
    }
}

export default getDoctorsBySpeciality;