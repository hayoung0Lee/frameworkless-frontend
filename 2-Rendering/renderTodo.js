const getTodoElement = (todo) => {
  const { text, completed } = todo;
  return `
        <li ${completed ? 'class="completed"' : ""}>
            <div class="view">
                <label>
                    ${text}
                    <input 
                        ${completed ? "checked" : ""}
                        class="toggle"
                        type="checkbox"
                    />
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}"/>
        </li>
    `;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  if (length === 1) {
    return `1 Item left`;
  }

  return `${length} Item left`;
};

const getElement = (targetElement, state) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true); // element를 깊은 복사
  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return element;
};

const getTodos = [
  { text: "text", completed: true },
  { text: "text2", completed: true },
  { text: "text3", completed: false },
];

const state = {
  todos: getTodos,
  currentFilter: "All",
};

const main = document.querySelector(".todoapp");
window.requestAnimationFrame(() => {
  console.log("request");
  const newMain = getElement(main, state);
  main.replaceWith(newMain);
});
