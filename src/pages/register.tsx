import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FirebaseError } from "firebase/app"; // Importação correta do FirebaseError

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const isStrongPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const registerWithEmail = async () => {
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.warning(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Conta criada com sucesso!");
      setTimeout(() => router.push("/tasks"), 2000);
    } catch (err: unknown) { // Tipando o erro como 'unknown'
      if (err instanceof FirebaseError) { // Verificando se o erro é uma instância de FirebaseError
        if (err.code === "auth/weak-password") {
          toast.error("A senha precisa ter pelo menos 6 caracteres.");
        } else if (err.code === "auth/email-already-in-use") {
          toast.error("Este email já está em uso.");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Email inválido.");
        } else {
          toast.error("Erro ao criar conta. Tente novamente.");
        }
      } else {
        toast.error("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 px-4">
      <div className="p-8 sm:p-10 max-w-md w-full bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Criar Conta</h2>

        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3 right-3 text-gray-500"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={registerWithEmail}
          className="w-full p-4 bg-green-500 text-white rounded-lg mb-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          Criar Conta
        </button>

        <div className="text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
    </div>
  );
}
