import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Ekart/Home";

function App() {
  return (

    <div className="App">
        <HashRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/Home"/>} />
                <Route path={"/Home"} element={<Home />}/>
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
