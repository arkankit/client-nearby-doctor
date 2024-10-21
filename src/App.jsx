//import { useEffect, useState } from "react";


function App() {

  // const [message, setMessage] = useState("");

  // useEffect(() =>{

  //   fetch("https://server-nearby-doctor-production.up.railway.app/").then(response =>{
  //     return response.json();
  //   }).then(result => {
  //     setMessage(result);
  //   }).catch(err => {
  //     console.log("Error:", err);
  //   });
  // },[]);


  return (
    <div>
      <h1>{message.mesg}</h1>
    </div>
  );
}

export default App;
