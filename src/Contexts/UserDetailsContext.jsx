import { createContext, useContext, useEffect, useState } from "react";

const UserDetailsContext = createContext(); // created context forcreating seamless access to users basic data

export function UserDetailsProvider({ children }) {
  // defined the provider for the above context
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : {
          firstName: "",
          lastName: "",
          address: "",
          planCode: "",
          userName: "",
          pwd: "",
        };
  }); // fetching context data from localstorage and setting it up for the initial value, else setting data to empty strings

  // Function to update username
  const updateUserName = (newUserName) => {
    setUserData((prevData) => ({
        ...prevData,
        userName: newUserName,
    }));
    // Optionally update localStorage
    localStorage.setItem("userData", JSON.stringify({ ...userData, userName: newUserName }));
};

const updatePwd = (newPwd) => {
    setUserData((prevData) => ({
        ...prevData,
        pwd: newPwd,
    }));
    // Optionally update localStorage
    localStorage.setItem("userData", JSON.stringify({ ...userData, pwd: newPwd }));
};

  return (
    <UserDetailsContext.Provider value={{ userData, setUserData, updateUserName, updatePwd }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export function userDetailsGetter() {
  // defining a custom hook to access the context data easily everywhere
  return useContext(UserDetailsContext);
}

/* USerDetailsProvider and userDetailsGetter can be imported using the {} notation while importing into components
as these are not default exports*/
