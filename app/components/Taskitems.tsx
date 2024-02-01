import React from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}

export const TodoListItem: React.FC<Props> = ({
  todo,
  toggleComplete,
  deleteTask,
}) => {
  return (
    <div className="flex justify-between mb-1">
      <div className="overflow-x-hidden whitespace-nowrap">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="appearance-none w-4 h-4 border-2 mr-2 rounded-sm bg-white
          peer shrink-0
          checked:bg-terracota checked:border-0
          transition-colors duration-300"
        />
        <label className="static">{todo.text}</label>
      </div>
      <button
        className="transform transition-transform duration-300 hover:scale-110"
        onClick={() => deleteTask(todo.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
        </svg>
      </button>
    </div>
  );
};
