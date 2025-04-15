import { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo, updateTodo } from "../services/todoService";
import { Todo } from "../types/types";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchTodosHandler();
    }, []);

    const fetchTodosHandler = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetchTodos();
            setTodos(response.data);
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await addTodo({ title: newTask });
            setTodos((prev) => [...prev, response.data]);
            setNewTask("");
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (id: number) => {
        setLoading(true);
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditTask = (id: number, title: string) => {
        setEditingId(id);
        setNewTask(title);
    };

    const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingId) return;

        setLoading(true);
        try {
            const response = await updateTodo(editingId, { title: newTask });
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === editingId ? { ...todo, title: response.data.title } : todo
                )
            );
            setEditingId(null);
            setNewTask("");
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setNewTask("");
    };

    return {
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
    };
};