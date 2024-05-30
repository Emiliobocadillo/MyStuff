import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App = () => {
  const { state } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/items"
          element={state.userEmail ? <ItemsPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
};

export default App;
