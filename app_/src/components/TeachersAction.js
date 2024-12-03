import Axios from "axios";

export default function TeachersAction({ pid }) {
  const API_URL = `http://localhost:3001/api/teachers/${pid}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este professor?");
    if (confirmDelete) {
      try {
        await Axios.delete(API_URL);
        alert("Professor deletado com sucesso!");

       
        window.location.reload();
      } catch (error) {
        console.error("Erro ao deletar o professor:", error);
        alert("Erro ao deletar o professor. Tente novamente.");
      }
    }
  };

  return (
    <>
      <a className="btn btn-outline-success btn-sm me-2" href={`/admin/teachers/read/${pid}`}>Visualizar</a>
      <a className="btn btn-outline-primary btn-sm me-2" href={`/admin/teachers/update/${pid}`}>Editar</a>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Deletar
      </button>
    </>
  );
}
