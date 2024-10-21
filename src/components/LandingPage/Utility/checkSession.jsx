import axios from "axios";
async function checkSession() {
    try {
        const response = await axios.get("http://server-nearby-doctor-production.up.railway.app/session", {
          withCredentials: true,
        });
        if (response.data.sessionActive) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log("Error fetching session:", err);
      }
}

export default checkSession;