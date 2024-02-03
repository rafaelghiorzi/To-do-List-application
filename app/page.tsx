"use client";

import { useState } from "react";
import { TodoListItem } from "./components/Taskitems";
import ThemeButton from "./components/themeButton";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalizar modo escuro", completed: true },
    { id: 2, text: "Implementar drag and drop", completed: false },
    { id: 3, text: "Implementar pop up de certeza", completed: false },
    { id: 4, text: "Implementar design responsivo", completed: true },
    {
      id: 5,
      text: "Botar as tarefas no cache ou algo assim",
      completed: false,
    },
    {
      id: 6,
      text: "Arrumar a paleta de cores do tema escuro",
      completed: false,
    },
    //more tasks ...
  ]);

  const [filter, setFilter] = useState("all");

  const [theme, setTheme] = useState("light");

  const remainingTasks = tasks.reduce(
    (count, task) => (task.completed ? count : count + 1),
    0
  );

  const toggletheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed)
  );

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggleComplete(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <main
      className={`h-screen w-screen text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl relative ${
        theme === "dark" ? "bg-white" : "bg-darkBackground text-white"
      }`}
      id="tela"
    >
      <header className="text-center p-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold flex items-center justify-center ">
        To do list!
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          fill={theme === "dark" ? "#000000" : "#ffffff"}
          viewBox="0 0 256 256"
          className="sm:ml-1 md:ml-2 lg:ml-3 xl:ml-5
          scale-75 sm:scale-90 md:scale-110 lg:scale-150 xl:scale-150"
        >
          <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path>
        </svg>
      </header>

      <main
        className={`m-auto w-3/4 border-2 pt-2 rounded-xl flex-col mb-10 ${
          theme === "dark" ? "" : ""
        }`}
      >
        <section className="text-justify w-full p-2">
          <div className="w-full">
            <input
              autoFocus
              className="border-2 p-1 px-2 flex-grow flex-row text-black"
              style={{ borderRadius: "9px", width: "73%" }}
              type="text"
              placeholder="New task"
            />
            <button
              className={`border-2 p-1 m-2 ml-1 hover:bg-terracota transition-colors duration-300 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
              style={{ borderRadius: "9px", width: "23%" }}
              onClick={() => {
                const taskText = document.querySelector("input").value.trim();
                if (taskText !== "") {
                  const newTask = {
                    id: Date.now(),
                    text: taskText,
                    completed: false,
                  };
                  setTasks([...tasks, newTask]);
                  document.querySelector("input").value = "";
                }
              }}
            >
              Add
            </button>
          </div>
          <div
            className="max-h-screen overflow-y-auto px-1 my-2"
            style={{ maxHeight: "35rem", minHeight: "25rem" }}
            id="to-do list"
          >
            {filteredTasks.length === 0 ? (
              <p
                className={`text-center self-center flex-col ${
                  theme === "dark" ? "text-gray" : "text-gray-light"
                }`}
              >
                No tasks available.
              </p>
            ) : (
              filteredTasks.map((task) => (
                <TodoListItem
                  key={task.id}
                  todo={task}
                  toggleComplete={handleToggleComplete}
                  deleteTask={deleteTask}
                  theme={theme}
                />
              ))
            )}
          </div>
        </section>
        <section
          className={`justify-around py-1 px-2 flex rounded-b-xl font-light bg-gray-dark" ${
            theme === "dark" ? "offwhite" : "bg-gray"
          }`}
        >
          <span className="font-medium hidden sm:hidden md:inline lg:inline xl:inline transition duration-300">
            {remainingTasks === 0
              ? "No tasks remaining"
              : `${remainingTasks} tasks remaining`}
          </span>
          <div className="flex text-center">
            <button /*this button will filter the list of things to do so that all items show up*/
              className={`mr-5 hover:text-terracota transition duration-300 ${
                filter === "all" ? "font-normal text-terracota" : "font-light"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button /* this button will filter the list of things to do so that only active tasks show up */
              className={`mr-5 hover:text-terracota transition duration-300 ${
                filter === "active"
                  ? "font-normal text-terracota"
                  : "font-light"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button /* this button will filter the list of things to do so that only completed tasks show up */
              className={`mr-5 hover:text-terracota transition duration-300 ${
                filter === "completed"
                  ? "font-normal text-terracota"
                  : "font-light"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <button /* this button will erase from the list all items that are tagged as completed */
            className="hover:text-terracota hidden sm:inline md:inline lg:inline xl:inline transition duration-300"
            onClick={() => {
              setTasks(tasks.filter((tasks) => !tasks.completed));
            }}
          >
            Clean completed
          </button>
        </section>
      </main>
      <ThemeButton theme={theme} toggletheme={toggletheme}></ThemeButton>
    </main>
  );
}
