import Link from "next/link";

export default function NavHome() {
  return (
    <nav className="navbar navbar-light justify-content-between p-4" style={styles.navHome}>
      <Link className="navbar-brand" href="#">
        <h2 style={styles.title}>Sistema de Gestão de Ensino Especial</h2>
      </Link>
      <div className="form-group">
        <Link className="btn btn-primary" href="/login" style={styles.loginBtn}>
          Login
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navHome: {
    backgroundColor: '#1a202c', 
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', 
  },
  title: {
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: '500',
    letterSpacing: '0.5px',
    margin: 0,
  },
  loginBtn: {
    backgroundColor: '#4CAF50', 
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '30px', 
    fontSize: '1rem',
    border: 'none',
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
  },
};


styles.loginBtn[':hover'] = {
  backgroundColor: '#45a049', 
  transform: 'scale(1.05)', 
};
