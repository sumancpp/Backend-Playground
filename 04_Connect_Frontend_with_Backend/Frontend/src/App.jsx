import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const App = () => {

  const [username, setUsername] = useState(null)
  const [age, setAge] = useState(null)
  const [city, setCity] = useState(null)

  async function getRes() {
    // const res = await fetch("http://localhost:8000/")
    // let data = await res.json()
    // console.log(data);


    /****** Now we use axios *********/

    //  axios.get("http://localhost:8000/")
    //  .then((e)=>{
    //    console.log(e);
    //    console.log(e.data);
    //    console.log(e.data.name);
    //    console.log(e.data.age);
    //  })  
    //  .catch((e)=>{
    //    console.log(e);
    //  })  




    axios.post("http://localhost:8000/", {
      username,
      city,
      age
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <div>
      {/* <button onClick={()=>getRes()}>Send</button> */}

      <input type="text" placeholder='name' value={username} onChange={(e) => setUsername(e.target.value)} />

      <input type="number" placeholder='age' value={age} onChange={(e) => setAge(e.target.value)} />

      <input type="text" placeholder='city' value={city} onChange={(e) => setCity(e.target.value)} />

      <button onClick={() => getRes()}>Send</button>
    </div>
  )
}

export default App
