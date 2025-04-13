import { TodoFormProps } from '../types/types';

const TodoForm = ({ newTask, setNewTask, handleSubmit, editingId, cancelEditing }: TodoFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
                {editingId ? "Edit Task" : "Add Task"}
            </button>
            {editingId && (
                <button
                    type="button"
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default TodoForm;
