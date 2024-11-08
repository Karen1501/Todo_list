"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirige si no hay token
      router.push("/");
    } else {
      setUser({ username: "usuarioEjemplo" });
    }
  }, [router]);

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {user && <p>Usuario: {user.username}</p>}
    </div>
  );
};

export default Dashboard;
