import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Ekart/Home";
import Products from './Ekart/Products';
import ProductDetails from './Ekart/Products/product-details';

function App() {
  return (

    <div className="App">
        <HashRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/Home"/>} />
                <Route path="/Home" element={<Home />}/>
                <Route path="/Products" element={<Products />} />
                <Route path="/Products/:productId" element={<ProductDetails />} />
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
