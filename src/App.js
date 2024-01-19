import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";

function App() {
  // const user = false;
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
