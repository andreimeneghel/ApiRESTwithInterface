import Axios from "axios";

export default function EventsAction({ pid }) {
  const API_URL = `http://localhost:3001/api/events/${pid}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este evento?");
    if (confirmDelete) {
      try {
        await Axios.delete(API_URL);
        alert("Evento deletado com sucesso!");


        window.location.reload(); 
      } catch (error) {
        console.error("Erro ao deletar o evento:", error);
        alert("Erro ao deletar o evento. Tente novamente.");
      }
    }
  };

  return (
    <>
      <a className="btn btn-outline-success btn-sm me-2" href={`/admin/events/read/${pid}`}>Visualizar</a>
      <a className="btn btn-outline-primary btn-sm me-2" href={`/admin/events/update/${pid}`}>Editar</a>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Deletar
      </button>
    </>
  );
}
