export class Project {
    constructor(name) {
        this.name = name;
        this.todos = []
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    removeTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
    }
}

export class Todo {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isChecked = false;
    }
}

export const defaultProject = new Project('Default');

export let activeProject = defaultProject;

const todo1 = new Todo('Task 1', 'Description for task 1', '2023-12-31', 'high');
const todo2 = new Todo('Task 2', 'Description for task 2', '2023-12-15', 'medium');

defaultProject.addTodo(todo1);
defaultProject.addTodo(todo2);

export const projects = [defaultProject];

// get elements
const projectsContainer = document.getElementById('nav');
const todosContainer = document.getElementById('main');
const contentDiv = document.getElementById('content');
const formDiv = document.getElementById('form-pop-up');
const detailsDiv = document.getElementById('details-pop-up');

// Function to display projects
export function displayProjects() {
    projectsContainer.innerHTML = '';

    // display "Projects" heading
    const projectsHeading = document.createElement('li');
    projectsHeading.textContent = 'Projects';
    projectsHeading.classList.add('projects-heading');
    projectsContainer.appendChild(projectsHeading);
    projects.forEach(project => {
        const projectButton = document.createElement('li');
        projectButton.textContent = project.name;
        if (project === activeProject) {
            projectButton.classList.add('active-project');}
    
        projectButton.addEventListener('click', () => {
            const activeProjectButton = document.querySelector('.active-project');
            if (activeProjectButton) {
                activeProjectButton.classList.remove('active-project');
            }

            projectButton.classList.add('active-project');

            activeProject = project;
            displayTodos(project);
        });
        projectsContainer.appendChild(projectButton);
    });
}

// Function to display todos for a project
export function displayTodos(project) {
    todosContainer.innerHTML = '';

    const todoAddDiv = document.createElement('div');
    todoAddDiv.classList.add('todoAdd');
    todoAddDiv.textContent = 'Add todo';
    todoAddDiv.addEventListener("click", () => switchBlur("on", switchElement(formDiv, "on")));
    todosContainer.appendChild(todoAddDiv);

    project.todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        switch(todo.priority) {
            case 'high':
                todoDiv.classList.add('high');
                break;
            case 'medium':
                todoDiv.classList.add('medium');
                break;
            case 'low':
                todoDiv.classList.add('low');
                break;
        }
        const todoTitleDiv = document.createElement('div');
        todoTitleDiv.textContent = todo.title;
        const todoDetailsDiv = document.createElement('div');
        todoDetailsDiv.classList.add('todoDetails');
        todoDetailsDiv.textContent = 'Details';
        todoDetailsDiv.addEventListener("click", () => showDetails(todo.title, todo.description, todo.dueDate));
        const todoDateDiv = document.createElement('div');
        todoDateDiv.textContent = todo.dueDate;
        const todoDeleteDiv = document.createElement('div');
        todoDeleteDiv.classList.add('todoDelete');
        todoDeleteDiv.textContent = 'Delete';
        todoDeleteDiv.addEventListener("click", () => removeTodoAndRefresh(project, todo));

        todoDiv.appendChild(todoTitleDiv);
        todoDiv.appendChild(todoDetailsDiv);
        todoDiv.appendChild(todoDateDiv);
        todoDiv.appendChild(todoDeleteDiv);

        todosContainer.appendChild(todoDiv);
    });
}

export function addTodoAndRefresh(project, title, details, date, priority) {
    if (project) {
        const todo = new Todo(title, details, date, priority);
        project.addTodo(todo);
        displayTodos(project);
    }
}

function removeTodoAndRefresh(project, todo) {
    if (project) {
      if (todo) {
        project.removeTodo(todo);
        displayTodos(project);
      }
    }
}

export function switchElement(element, turn) {
    if (turn === "on") {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

export function switchBlur(turn, eventToDo) {
    if (turn === "on") {
        document.body.style.backdropFilter = 'blur(1rem)';
        contentDiv.style.filter = 'blur(1rem)';
    } else {
        document.body.style.backdropFilter = '';
        contentDiv.style.filter = '';
    }
    if (eventToDo) {
        eventToDo;
    }   
}

function showDetails(title, description, dueDate) {
    detailsDiv.innerHTML = '';
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;
    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = description;
    const dueDateDiv = document.createElement('div');
    dueDateDiv.textContent = dueDate;
    const exitDiv = document.createElement('div');
    exitDiv.classList.add('todoExit');
    exitDiv.textContent = "❌";
    exitDiv.addEventListener("click", () => switchBlur("off", switchElement(detailsDiv, "off")))
    detailsDiv.appendChild(titleDiv);
    detailsDiv.appendChild(descriptionDiv);
    detailsDiv.appendChild(dueDateDiv);
    detailsDiv.appendChild(exitDiv);
    switchBlur("on", switchElement(detailsDiv, "on"));
}