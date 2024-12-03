import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavAdmin() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navAdmin}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="#" style={styles.title}>
          <h2 style={{ margin: 0 }}>Sistema de Gestão de Ensino Especial</h2>
        </Link>
        <div className="d-flex">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="btn btn-danger btn-lg"
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navAdmin: {
    backgroundColor: "#1a202c", 
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
  },
  title: {
    color: "#ffffff",
    fontSize: "1.8rem",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  logoutBtn: {
    backgroundColor: "#E53E3E",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "30px",
    fontSize: "1rem",
    border: "none",
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
  },
};

styles.logoutBtn[":hover"] = {
  backgroundColor: "#c53030",
  transform: "scale(1.05)",
};
