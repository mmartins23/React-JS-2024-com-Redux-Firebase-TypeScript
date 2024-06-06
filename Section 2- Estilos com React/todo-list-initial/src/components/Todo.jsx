// CSS Styles
import './Todo.scss';

function Todo({ todo }) {

    return (
        <>
            <div className={`todo ${todo.isDone ? 'done' : ''}`}>
                <button className="erase">x erase</button>
                <h3>
                    {todo.title}
                </h3>
                <p>
                    {todo.description}
                </p>
                <div className="task-check">
                    <input type="checkbox" checked={todo.isDone} />
                    <label>
                        {!todo.isDone ? 'To-Do' : 'Done'}
                    </label>
                </div>
            </div>

        </>
    )
}

export default Todo