import { useEffect, useState } from "react";

function App() {

  const [Count, setCount] = useState(0)

  async function calling(){
  const response =  await fetch("https://jsonplaceholder.typicode.com/todos/2")

  console.log(response);
  
  const result = await response.json()
  console.log(result);
  
  }

  useEffect(() =>{
    calling();
    console.log("Counting in repeat");
    
  },[Count])

  return(

<button onClick={() => setCount(Count + 1)}>Increment {Count}</button>
    
  )
}

export default App
