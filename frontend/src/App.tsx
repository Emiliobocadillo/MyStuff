import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";
import HomePage from "./pages/HomePage";
import ItemsPage from "./pages/ItemsPage";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./styles/global.css"; // Import global styles
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const App = () => {
  const { state } = useAuth();

  return (
    <>
      <ToastContainer
        position="top-center" // Change this to your preferred position
        autoClose={5000} // Auto close the toast after 5000ms (5 seconds)
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // Newest toast appears on top
        closeOnClick // Close the toast on click
        rtl={false} // Right to Left layout
        pauseOnFocusLoss // Pause the toast on focus loss
        draggable // Allow to drag the toast
        pauseOnHover // Pause the toast on hover
      />
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
