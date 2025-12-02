import { useState } from 'react'
import './App.css'
import HeadComponent from "./component/HeadComponent.jsx";
import ListComponent from "./component/ListComponent.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <HeadComponent/>
        <ListComponent/>
    </>
  )
}

export default App
