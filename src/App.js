import './App.css';
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./Ekart/Home";
import Products from './Ekart/Products';
import ProductDetails from './Ekart/Products/product-details';
import Login from "./Ekart/Login";
import Ekart from "./Ekart";
import {createTheme} from "@mui/material";

function App() {
  return (
      <div>
        <HashRouter>
          <Routes>
            <Route path="*" element={<Ekart/>}/>
          </Routes>
        </HashRouter>
      </div>
  );
}

export default App;
