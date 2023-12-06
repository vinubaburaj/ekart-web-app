import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Ekart from "./Ekart";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="*" element={<Ekart />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
