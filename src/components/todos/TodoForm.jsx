import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAsyncTodo, addTodo } from "../../features/todoSlice/todoSlice";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const formSubmit = (event) => {
    event.preventDefault();
    if (!value) return;
    dispatch(addAsyncTodo({ title: value }));
    setValue("");
  };

  return (
    <div className="w-full mb-5 ">
      <form onSubmit={formSubmit} className="max-w-2xl mx-auto ">
        <div className="flex items-center justify-between border-b border-gray-400 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Todo ..."
            aria-label="Todo"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 duration-200 text-white py-1 px-2 rounded"
            type="submit"
          >
            submit
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-blue-500 hover:text-blue-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => setValue("")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
