import { useState } from "react";
import { useRouter } from "next/router";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success("Login com Google realizado com sucesso!");
        router.push("/tasks");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/popup-closed-by-user") {
          toast.warn("Você fechou a janela de login. Tente novamente.");
        } else {
          toast.error(`Erro: ${err.message}`);
        }
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  const loginWithEmail = async () => {
    if (!email || !password) {
      toast.warn("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) {
        toast.success("Login realizado com sucesso!");
        router.push("/tasks");
      }
    } catch {
      toast.error("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  const resetPassword = async () => {
    if (!email) {
      toast.warn("Por favor, insira seu email para redefinir a senha.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email de redefinição de senha enviado!");
    } catch {
      toast.error("Erro ao enviar email. Verifique o email digitado.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500 px-4">
      <div className="p-8 sm:p-10 max-w-lg w-full bg-white rounded-xl shadow-xl border border-gray-200 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3 right-3 text-gray-600"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={loginWithEmail}
          className="w-full p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          Login com Email
        </button>

        <button
          onClick={loginWithGoogle}
          className="w-full p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Login com Google
        </button>

        <div className="text-center text-gray-600">
          <button
            onClick={() => router.push("/register")}
            className="text-blue-600 hover:underline"
          >
            Criar Conta
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={resetPassword}
            className="text-red-500 hover:underline"
          >
            Esqueci minha senha
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
    </div>
  );
}
