import Axios from 'axios';  // Certifique-se de importar Axios
import NavAdmin from '@/components/NavAdmin';
import MenuAdmin from '@/components/MenuAdmin';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UpdateStudent() {
  const API_URL = "http://localhost:3001/api/students/";

  const [student, setStudent] = useState({
    name: "",
    age: "",
    parents: "",
    phone: "",
    special: "",
    status: ""
  });

  const router = useRouter();
  const { pid } = router.query;

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    if (pid) {
      const getStudent = async () => {
        try {
          const response = await Axios.get(`${API_URL}${pid}`);
          setStudent(response.data);
        } catch (error) {
          setMessage({ message: "Erro ao buscar o estudante!", status: "error" });
        }
      };

      getStudent();
    }
  }, [pid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleUpdateStudent = async () => {
    if (!pid) {
      setMessage({ message: "ID do estudante não encontrado!", status: "error" });
      return;
    }

    try {
      const response = await Axios.put(`${API_URL}${pid}`, student);
      setMessage({ message: "Estudante atualizado com sucesso!", status: "ok" });
      setTimeout(() => {
        router.push('/admin/students');
      }, 1500);
    } catch (error) {
      setMessage({ message: "Erro ao atualizar o estudante!", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuAdmin />
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            { 
              message.status === "" ? "" : 
              message.status === "ok" ? <div className='alert alert-success' role='alert'> { message.message } <Link className='alert-link' href='/admin/students'>Voltar</Link></div> : 
              <div className='alert alert-danger' role='alert'> { message.message } <Link className='alert-link' href='/admin/students'>Voltar</Link></div>
            }
            <h3>Edição de Estudante</h3>
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control" 
                  value={student.name} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="age">Idade</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  className="form-control" 
                  value={student.age} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="parents">Responsáveis</label>
                <input 
                  type="text" 
                  id="parents" 
                  name="parents" 
                  className="form-control" 
                  value={student.parents} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Telefone</label>
                <input 
                  type="text" 
                  id="phone" 
                  name="phone" 
                  className="form-control" 
                  value={student.phone} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="special">Especialidade</label>
                <input 
                  type="text" 
                  id="special" 
                  name="special" 
                  className="form-control" 
                  value={student.special} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select 
                  className="form-select" 
                  id="status" 
                  name="status" 
                  value={student.status} 
                  onChange={handleChange}
                >
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleUpdateStudent}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/students">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}