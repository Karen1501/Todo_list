"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        localStorage.setItem("token", data.token);
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
    <div className="container mx-auto p-4 flex items-center h-screen justify-center">
      <div className="w-3/4">
        <h1 className="text-2xl text-center mb-4">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="border border-gray-500 p-4 rounded-lg shadow flex flex-col gap-4 mb-4"
        >
          <div className="flex flex-col gap-2">
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="p-4 h-8 rounded-lg border border-gray-200 shadow-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-4 h-8 rounded-lg border border-gray-200 shadow-md"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-800 hover:cursor-pointer hover:bg-indigo-400 text-white w-1/2 mx-auto"
          >
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </button>
        </form>
        <button
          onClick={toggleForm}
          className="mx-auto text-blue-800 text-center block"
        >
          {isLogin ? (
            <>
              {" "}
              "¿No tienes cuenta?"<span className="font-bold"> Regístrate</span>
            </>
          ) : (
            <>
              {" "}
              "¿Ya tienes cuenta? "
              <span className="font-bold"> Inicia sesión</span>
            </>
          )}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
