import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
    const {
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
    } = useTodos();

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
