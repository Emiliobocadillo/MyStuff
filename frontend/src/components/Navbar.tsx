import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const { userEmail } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        MyStuff
      </Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/items" className={styles.link}>
          Items
        </Link>
        {userEmail ? (
          <>
            <span className={styles.userEmail}>{userEmail}</span>
            <button onClick={handleLogout} className={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
