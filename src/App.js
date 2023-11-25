import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import Ekart from "./Ekart";

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
