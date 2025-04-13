import {useEffect, useState} from 'react';
import axiosInstance from "./api/api.jsx";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from "./types/types";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [newTask, setNewTask] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchTodos();
    } , []);

    const fetchTodos = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axiosInstance.get<Todo[]>("/todos?_limit=10");
            setTodos(response.data);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.post<Todo>("/todos", {title: newTask});
            setTodos((prevTodos) => [...prevTodos, response.data]);
            setNewTask("");
        } catch (err: any) {
            console.error('error in add new task',err.message);
            setError(err.message);
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteTask = async (id: number) => {
        try {
            setLoading(true);
            await axiosInstance.delete(`/todos/${id}`);
            setTodos((pervtodos) => pervtodos.filter(todo => todo.id !== id));
        } catch (err: any){
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleEditTask = (id: number, title: string) => {
        setEditingId(id);
        setNewTask(title);
    };

    const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.put<Todo>(`/todos/${editingId}`, {title: newTask});
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === editingId ? { ...todo, title: response.data.title } : todo
                )
            );
            setEditingId(null);
            setNewTask("");
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const cancelEditing = () => {
        setEditingId(null);
        setNewTask("");
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
                {loading && <p className="text-blue-500 text-center mb-2">Loading...</p>}
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <TodoForm
                    newTask={newTask}
                    setNewTask={setNewTask}
                    handleSubmit={editingId ? handleUpdateTask : handleAddTask}
                    editingId={editingId}
                    cancelEditing={cancelEditing}
                />

                <TodoList
                    todos={todos}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                />
            </div>
        </>
    )
}

export default App;
