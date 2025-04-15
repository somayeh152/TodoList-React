import { useEffect, useState } from "react";
import { Todo } from "../types/types";
import axiosInstance from "../api/api.tsx";

export const useTodos = () => {
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
            const response = await axiosInstance.post<Todo>("/todos", {title: newTask});
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
            await axiosInstance.delete(`/todos/${id}`);
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
            const response = await axiosInstance.put<Todo>(`/todos/${editingId}`, {title: newTask});
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

    return{
        todos,
        loading,
        error,
        newTask,
        setNewTask,
        editingId,
        handleAddTask,
        handleDeleteTask,
        handleEditTask,
        handleUpdateTask,
        cancelEditing,
    }
}