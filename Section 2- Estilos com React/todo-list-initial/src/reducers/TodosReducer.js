export default function todosReducer(todos, action) {
    switch (action.type) {
        case 'deleted': {
            if (confirm("Are you sure you want to delete?")) {
                return todos.filter(todo => todo.id !== action.id);
            }
            return todos; // Retornar o estado atual se o usuário cancelar a exclusão
        }

        case 'toggledIsDone': {
            return todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, isDone: !todo.isDone }; // Criar um novo objeto com o valor alternado
                }
                return todo;
            });
        }

        default:
            return todos; // Retornar o estado atual por padrão
    }
}
