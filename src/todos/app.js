import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { renderPending, renderTodos } from './use-cases';

const ElementIds = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    FiltersLIs: '.filtro',
    PendingCountLabel: '#pending-count',
}

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        console.log(todos);
        renderTodos(ElementIds.TodoList, todos);
    }

    const updatePendingCounter = () => {
        renderPending(ElementIds.PendingCountLabel);
    };

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
        updatePendingCounter();
    })();



    //Referencia HTML
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const cleaCompletedButton = document.querySelector(ElementIds.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIds.FiltersLIs);
    const PendingCountLabel = document.querySelectorAll(ElementIds.FiltersLIs);



    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode != 13) return;

        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();

        event.target.value = '';

    })

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
        updatePendingCounter();
    });

    todoListUL.addEventListener('click', (event) => {

        const element = event.target;

        if (element.className != 'destroy') return;

        const elementIl = event.target.closest('[data-id]');

        todoStore.deleteTodo(elementIl.getAttribute('data-id'));
        displayTodos();
        updatePendingCounter();
    });

    cleaCompletedButton.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLIs.forEach(element => {

        element.addEventListener('click', () => {

            filtersLIs.forEach(el => { el.classList.remove('selected'); });

            element.classList.add('selected');

            switch (element.getAttribute('id')) {
                case 'all':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'pending':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'completed':
                    todoStore.setFilter(Filters.Completed);
                    break;

                default:
                    todoStore.setFilter(Filters.All);
                    break;
            }
            displayTodos();
        });

    });



}
