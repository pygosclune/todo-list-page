import { Project, displayProjects, displayTodos, addTodoAndRefresh, switchBlur, switchElement, projects, activeProject, defaultProject } from './mainTodos.js';

const headerContainer = document.getElementById('mainHeader');
const formDiv = document.getElementById('form-pop-up');
const todoForm = document.getElementById('add-todo');

// Initial display
displayProjects();
displayTodos(defaultProject);

const cancelFormDiv = document.createElement('div');
cancelFormDiv.classList.add('formCancel');
cancelFormDiv.textContent = "❌";
cancelFormDiv.addEventListener("click", () => switchBlur("off", switchElement(formDiv, "off")));
formDiv.appendChild(cancelFormDiv);

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById('todo-title');
    let details = document.getElementById('todo-details');
    let date = document.getElementById('todo-date');
    let priority;
    let priorityElements = document.getElementsByName('priority');
    
    for (const element of priorityElements) {
        if (element.checked) {
            priority = element.value;
            break;
        }
    }
    addTodoAndRefresh(activeProject, title.value, details.value, date.value, priority); //targets activeProject variable
    switchBlur("off", switchElement(formDiv, "off"));
    todoForm.reset();
});

const newProjectDiv = document.createElement('div');
newProjectDiv.classList.add('projectAdd');
newProjectDiv.textContent = 'New Project';
newProjectDiv.addEventListener('click', () => {
    const projectName = prompt('Enter the name of the new project:');
    if (projectName) {
        const newProject = new Project(projectName);
        projects.push(newProject);
        displayProjects();
    }
});
headerContainer.appendChild(newProjectDiv);
