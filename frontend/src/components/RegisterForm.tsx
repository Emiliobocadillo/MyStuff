import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Update import path
import styles from "../styles/AuthForm.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const lowerCaseEmail = email.toLowerCase(); // Convert email to lowercase
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: lowerCaseEmail,
          password,
        }
      );
      const { token } = response.data;
      dispatch({ type: "LOGIN", payload: { email: lowerCaseEmail, token } }); // Dispatch LOGIN action
      navigate("/items"); // Redirect to items page after registration
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <h2 className={styles.heading}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())} // Ensure email is lowercase
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "8px" }} />
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
