export const createTodoHTML = (todo) => {

    const { id, description, done } = todo;

    const html =
        `<div class="view">
                <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
                <label>${description}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">`
        ;

    const liElement = document.createElement('li');

    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);

    todo.done ? liElement.classList.add('completed') : true;

    return liElement;
}