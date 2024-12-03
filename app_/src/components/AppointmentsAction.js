import Axios from "axios";

export default function AppointmentsAction({ pid }) {
  const API_URL = `http://localhost:3001/api/appointments/${pid}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este compromisso?");
    if (confirmDelete) {
      try {
        await Axios.delete(API_URL);
        alert("Compromisso deletado com sucesso!");


        window.location.reload(); 
      } catch (error) {
        console.error("Erro ao deletar o compromisso:", error);
        alert("Erro ao deletar o compromisso. Tente novamente.");
      }
    }
  };

  return (
    <>
      <a className="btn btn-outline-success btn-sm me-2" href={`/admin/appointments/read/${pid}`}>Visualizar</a>
      <a className="btn btn-outline-primary btn-sm me-2" href={`/admin/appointments/update/${pid}`}>Editar</a>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Deletar
      </button>
    </>
  );
}
