import { useEffect, useState } from "react";

export const Api = () => {
    const [objects, setObjects] = useState([]); 
  
    const requestApi = () => {
      fetch('https://api.github.com/') 
          .then((response) => {
              if(!response.ok) {
                  throw new Error(`Request failed with status ${response.status}`); 
              }
              return response.json()
          })             
          .then((result) => {setObjects(result);
              console.log(result);}) 
          .catch((err) => {
              console.log(`Error: ${err}`);          
          })
          .finally(console.log('loaded'));
    };
    
    useEffect(() => { 
        requestApi();
      }, []
    );
  
    return console.log(objects);
  };

  export default Api;
