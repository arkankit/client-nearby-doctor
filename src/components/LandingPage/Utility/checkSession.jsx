import axios from "axios";
async function checkSession() {
    try {
        const response = await axios.get("http://localhost:3000/session", {
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