import {Routes, Route} from 'react-router-dom'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListPlayerComponent from "./component/ListPlayerComponent.jsx";
import AddPlayerComponent from "./component/AddPlayerComponent.jsx";
import DetailPlayerComponent from "./component/DetailPlayerComponent.jsx";
import UpdatePlayerComponent from "./component/UpdatePlayerComponent.jsx";
import HeadComponent from "./component/HeadComponent.jsx";

function App() {

    return (
        <>
            <HeadComponent/>
            <Routes>
                <Route path="/" element={<ListPlayerComponent/>}/>
                <Route path="/add" element={<AddPlayerComponent/>}/>
                <Route path="/detail/:id" element={<DetailPlayerComponent/>}/>
                <Route path="/update/:id" element={<UpdatePlayerComponent />} />
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
