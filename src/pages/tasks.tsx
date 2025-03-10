import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

const categoryColors: { [key: string]: string } = {
  Trabalho: "bg-blue-200",
  Estudo: "bg-yellow-200",
  Pessoal: "bg-green-200",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Trabalho");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, "id">),
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await addDoc(collection(db, "tasks"), {
        text: newTask,
        completed: false,
        category,
      });
      toast.success("Tarefa adicionada!");
      setNewTask("");
    } catch {
      toast.error("Erro ao adicionar a tarefa.");
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, "tasks", id), { completed: !completed });
      toast.info(completed ? "Tarefa marcada como pendente." : "Tarefa concluída!");
    } catch {
      toast.error("Erro ao atualizar a tarefa.");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toast.warn("Tarefa removida!");
    } catch {
      toast.error("Erro ao remover a tarefa.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">Minhas Tarefas</h2>
      <button
        onClick={() => signOut(auth)}
        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition duration-200 absolute top-4 right-4"
      >
        <FaSignOutAlt size={20} />
      </button>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nova tarefa"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Trabalho">Trabalho</option>
          <option value="Estudo">Estudo</option>
          <option value="Pessoal">Pessoal</option>
        </select>
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Adicionar
        </button>
      </div>
      <ul className="space-y-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between p-3 border-b rounded-md cursor-pointer transition-all ${
                categoryColors[task.category] || "bg-gray-200"
              } ${task.completed ? "line-through" : ""}`}
            >
              <span>{task.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task.id, task.completed)}
                  className={`px-4 py-1 rounded-md transition duration-200 ${
                    task.completed ? "bg-blue-500 text-white" : "bg-yellow-500 text-white"
                  }`}
                >
                  {task.completed ? "Concluído" : "Concluir"}
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  X
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
