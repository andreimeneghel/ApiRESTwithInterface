import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result && result.ok) {
      router.push('/admin');
    } else {
      setError('Email ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <>
      <Head>
        <title>Login | APP-BC</title>
        <meta name="description" content="Login to access the APP-BC dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="d-flex justify-content-center align-items-center text-white">
        <div className="card p-4 bg-dark text-white" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Bem-vindo</h2>
          {error && (
              <div className="alert alert-danger text-center">
                {error || "Erro ao fazer login. Verifique suas credenciais!"}
              </div>
            )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                id="password"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
          </form>
          <div className="text-center mt-3">
          </div>
        </div>
      </div>
    </>
  );
}
