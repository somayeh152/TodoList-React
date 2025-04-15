import axiosInstance from "../api/api";
import { Todo } from "../types/types";

export const fetchTodos = () => {
    return axiosInstance.get<Todo[]>("/todos?_limit=10");
}

export const addTodo = (newTask: {title: string}) => {
    return axiosInstance.post<Todo>("/todos", newTask);
}

export const deleteTodo = (id: number) => {
    return axiosInstance.delete(`/todos/${id}`)
}

export const updateTodo = (id: number, updatedTask: {title: string}) => {
    return axiosInstance.put<Todo>(`/todos/${id}`, updatedTask);
}