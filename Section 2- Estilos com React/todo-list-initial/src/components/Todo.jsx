// CSS Styles
import './Todo.scss';

function Todo({ todo, deleteTodo, toggleTodo }) {

    return (
        <>
            <div className={`todo ${todo.isDone ? 'done' : ''}`}>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="erase">
                    x erase
                </button>
                <h3>
                    {todo.title}
                </h3>
                <p>
                    {todo.description}
                </p>
                <div className="task-check">
                    <input
                        onClick={() => toggleTodo(todo.id)}
                        type="checkbox"
                        defaultChecked={todo.isDone} />
                    <label>
                        {!todo.isDone ? 'To-Do' : 'Done'}
                    </label>
                </div>
            </div>

        </>
    )
}

export default Todo;