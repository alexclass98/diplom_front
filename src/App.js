import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from "./components/NaviBar";
import Tags from "./components/Tags";
import Reader from "./components/Reader";
import Emulator from "./components/Emulator";
import React,{ BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <NaviBar/>
        <Routes>
          <Route exact path="/" element={<Emulator/>}>
          </Route>
            <Route path="/newtag" element={<Tags/>}>
            </Route>
          <Route path="/newreader" element={<Reader/>}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
