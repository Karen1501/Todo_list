"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/global.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Para alternar entre Login y Register
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Maneja el cambio entre Login y Register
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/api/login" : "/api/register";
    const body = { username, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (isLogin) {
          router.push("/tasks"); // Si inicia sesión correctamente, redirigir a la lista de tareas
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error de servidor");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Iniciar sesión" : "Registrarse"}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </button>
      </form>
      <button onClick={toggleForm}>
        {isLogin
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
