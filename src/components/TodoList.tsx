import TodoItem from "./TodoItem";
import { TodoListProps } from "../types/types";

const TodoList = ({todos, handleDeleteTask, handleEditTask}: TodoListProps) => {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                />
            ))}
        </ul>
    )
}

export default TodoList;