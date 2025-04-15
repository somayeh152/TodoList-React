import {useEffect, useState} from 'react';
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "./services/todoService";
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
        fetchTodosHandler();
    } , []);

    const fetchTodosHandler = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetchTodos();
            setTodos(response.data);
            console.log('Fetched Todos:', response.data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred in fetching tasks.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await addTodo({title: newTask});
            setTodos((prevTodos) => [...prevTodos, response.data]);
            setNewTask("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred in adding task.");
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteTask = async (id: number) => {
        try {
            setLoading(true);
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        } catch (err: unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred in deleting task.");
            }
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
            const response = await updateTodo(editingId!, {title: newTask});
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === editingId ? { ...todo, title: response.data.title } : todo
                )
            );
            setEditingId(null);
            setNewTask("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred in updating task.");
            }
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
