import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={currentUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
