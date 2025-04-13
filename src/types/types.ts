export interface Todo {
    id: number;
    title: string;
}

export interface TodoFormProps {
    newTask: string;
    setNewTask: (task: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    editingId: number | null;
    cancelEditing: () => void;
}

export interface TodoItemProps {
    todo: Todo;
    handleDeleteTask: (id: number) => void;
    handleEditTask: (id: number, title: string) => void;
}

export interface TodoListProps {
    todos: Todo[];
    handleDeleteTask: (id: number) => void;
    handleEditTask: (id: number, title: string) => void;
}
