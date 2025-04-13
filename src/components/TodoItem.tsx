import { TodoItemProps } from '../types/types';

const TodoItem = ({ todo, handleDeleteTask, handleEditTask }: TodoItemProps) => {
    return (
        <li className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
            <span>{todo.title}</span>
            <div className="flex gap-2">
                <button onClick={() => handleDeleteTask(todo.id)}
                        className="text-blue-500 hover:underline"
                >
                    Delete
                </button>
                <button
                    onClick={() => handleEditTask(todo.id, todo.title)}
                    className="text-red-500 hover:underline"
                >
                    Edit
                </button>
            </div>
        </li>
    )
}

export default TodoItem;