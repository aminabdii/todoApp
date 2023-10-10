import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteAsyncTodo,
  toggleAsyncTodo,
} from "../../features/todoSlice/todoSlice";

const TodoItem = ({ id, title, isCompleted }) => {
  const dispatch = useDispatch();

  return (
    <li className="border-solid border-b border-gray-400 last:border-b-0 p-2 py-3 flex items-center justify-between">
      <div className="flex items-center justify-between gap-2">
        <input
          onChange={() =>
            dispatch(toggleAsyncTodo({ id, isCompleted: !isCompleted }))
          }
          checked={isCompleted}
          className="rounded-md"
          type="checkbox"
        />
        <span
          className={`font-normal font-mono text-gray-500 text-base  ${
            isCompleted && "line-through text-gray-300"
          }`}
        >
          {title}
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteAsyncTodo({ id: id }))}
        className="px-3 py-2 bg-red-500 rounded-md font-light hover:bg-red-600 duration-200 text-white"
      >
        delete
      </button>
    </li>
  );
};

export default TodoItem;
