import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        MyStuff
      </Link>
      <div>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/items" style={styles.link}>
          Items
        </Link>
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
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "18px",
  },
};

export default Navbar;
