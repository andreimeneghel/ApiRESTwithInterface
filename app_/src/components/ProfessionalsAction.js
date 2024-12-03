import Axios from "axios";

export default function ProfessionalsAction({ pid }) {
  const API_URL = `http://localhost:3001/api/professionals/${pid}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este profissional?");
    if (confirmDelete) {
      try {
        await Axios.delete(API_URL);
        alert("Profissional deletado com sucesso!");

  
        window.location.reload(); 
      } catch (error) {
        console.error("Erro ao deletar o profissional:", error);
        alert("Erro ao deletar o profissional. Tente novamente.");
      }
    }
  };

  return (
    <>
      <a className="btn btn-outline-success btn-sm me-2" href={`/admin/professionals/read/${pid}`}>Visualizar</a>
      <a className="btn btn-outline-primary btn-sm me-2" href={`/admin/professionals/update/${pid}`}>Editar</a>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Deletar
      </button>
    </>
  );
}
