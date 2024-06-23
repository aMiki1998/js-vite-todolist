import { Todo } from '../todos/models/todo.model';
import { v4 as uuid } from "uuid";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,

}

const initStore = () => {
    loadStore();
    console.log('InitStore aguacate');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;

}

const saveStateToLocalStoreage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return state.todos;
        case Filters.Completed:
            return state.todos.filter(todo => todo.done)
            break;
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done)

            break;
        default:
            throw new Error(`Option ${filter} not valid`)
            break;
    }
}

const addTodo = (description) => {
    if (!description) throw new Error('Description is required');

    state.todos.push(new Todo(description))

    saveStateToLocalStoreage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStoreage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id != todoId);

    saveStateToLocalStoreage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStoreage();
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStoreage();
}

const getCurrentFilter = () => {
    return state.filter;
}

const getPendingTodosCounter = () => {
    return getTodos(Filters.Pending).length;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getPendingTodosCounter,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
};