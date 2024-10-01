import { useEffect, useState } from "react";

/*Once user starts typing, the input from event.target.value of the input text field is recieved here and this hook creates 
a delay of {delay} seconds before it is sent back to the useEffect of PlacesSearch component (which makes the api call), hence 
by providing a delay in API call, we limit frequent API calls on every keystroke from user*/

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clearnup function below resets the current timer if the value changes before the delay completes i.e 
    // user started typing again before delay time expired
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
