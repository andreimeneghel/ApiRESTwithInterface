import Axios from "axios";

export default function StudentAction({ pid }) {
  const API_URL = `http://localhost:3001/api/students/${pid}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza de que deseja deletar este estudante?");
    if (confirmDelete) {
      try {
        await Axios.delete(API_URL);
        alert("Estudante deletado com sucesso!");

        
        window.location.reload(); 
      } catch (error) {
        console.error("Erro ao deletar o estudante:", error);
        alert("Erro ao deletar o estudante. Tente novamente.");
      }
    }
  };

  return (
    <>
      <a className="btn btn-outline-success btn-sm me-2" href={`/admin/students/read/${pid}`}>Visualizar</a>
      <a className="btn btn-outline-primary btn-sm me-2" href={`/admin/students/update/${pid}`}>Editar</a>
      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        Deletar
      </button>
    </>
  );
}
