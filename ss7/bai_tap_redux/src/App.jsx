import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListPlayerComponent from "./component/ListPlayerComponent.jsx";
import AddPlayerComponent from "./component/AddPlayerComponent.jsx";
import {Link, Route, Routes} from "react-router";
import DetailPlayerComponent from "./component/DetailPlayerComponent.jsx";
import UpdatePlayerComponent from "./component/UpdatePlayerComponent.jsx";
import {ToastContainer} from "react-toastify";
import LoginComponent from "./component/login/LoginComponent.jsx";
import HeadComponent from "./component/HeadComponent.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <HeadComponent/>
        <Routes>
            <Route path="/" element={<ListPlayerComponent/>}/>
            <Route path="/add" element={<AddPlayerComponent/>}/>
            <Route path="/" element={<ListPlayerComponent/>}/>
            <Route path="/detail/:id" element={<DetailPlayerComponent/>}/>
            <Route path="/update/:id" element={<UpdatePlayerComponent />} />
            <Route path="/login" element={<LoginComponent />} />
        </Routes>
        <ToastContainer/>
    </>
  )
}

export default App
