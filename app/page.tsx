"use client";

import { useState } from "react";
import { TodoListItem } from "./components/Taskitems";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: false },
    //more tasks ...
  ]);

  const [filter, setFilter] = useState("all");

  const [theme, setTheme] = useState("light");

  const remainingTasks = tasks.reduce(
    (count, task) => (task.completed ? count : count + 1),
    0
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
    <main className="h-fit w-screen text-2xl">
      <header className="text-center p-2  text-8xl font-bold">
        To do list
      </header>
      <main className="m-auto w-3/4 border-2 pt-2 rounded-xl flex-col mb-10 ">
        <section className="text-justify w-full p-2">
          <div>
            <input /* This input will be the text that appears on the task you are creating, so its value will need to be read*/
              autoFocus
              className="border-2 p-1 px-2 flex-grow w-4/6 flex-row"
              style={{ borderRadius: "9px" }}
              type="text"
              placeholder="New task"
            />
            <button /* this button will be the add button, it will read the value of the input text above and make a item in the list of things to do, which appears down below */
              className="border-2 p-1 m-2 ml-auto flex-grow flex-row w-1/4 bg-black text-white hover:bg-terracota transition-colors duration-300"
              style={{ borderRadius: "9px" }}
              onClick={() => {
                const taskText = document.querySelector("input").value;
                const newTask = {
                  id: Date.now(),
                  text: taskText,
                  completed: false,
                };
                setTasks([...tasks, newTask]);
                document.querySelector("input").value = "";
              }}
            >
              Add
            </button>
          </div>
          <div className="min-h-96">
            {filteredTasks.map((task) => (
              <TodoListItem
                key={task.id}
                todo={task}
                toggleComplete={handleToggleComplete}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </section>
        <section className="justify-between px-2 py-1 mt-auto flex shadow-lg shadow-black rounded-b-xl font-light ">
          <span className="font-medium hidden sm:hidden md:inline lg:inline xl:inline">
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
            className="hover:text-terracota hidden sm:inline md:inline lg:inline xl:inline transition duration-500"
            onClick={() => {
              setTasks(tasks.filter((tasks) => !tasks.completed));
            }}
          >
            Clean completed
          </button>
        </section>
      </main>
    </main>
  );
}
