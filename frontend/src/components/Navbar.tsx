import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        MyStuff
      </Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/items" style={styles.link}>
          Items
        </Link>
        {userEmail ? (
          <>
            <span style={styles.userEmail}>{userEmail}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "18px",
  },
  userEmail: {
    color: "white",
    marginLeft: "20px",
    fontSize: "18px",
  },
  button: {
    marginLeft: "20px",
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
  },
};

export default Navbar;
