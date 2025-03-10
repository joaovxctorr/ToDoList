import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebaseConfig";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/tasks"); // Se o usuário estiver autenticado, redireciona para a página de tarefas
      } else {
        router.push("/login"); // Se não estiver autenticado, redireciona para o login
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <div className="p-4 max-w-lg mx-auto">Carregando...</div>;
}
