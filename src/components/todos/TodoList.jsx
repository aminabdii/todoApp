import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncTodos } from "../../features/todoSlice/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { isLoading, todos, error } = useSelector(({ todos }) => todos);
  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);

  console.log(todos);

  if (!todos.length) return <h2>Add your first todo</h2>;
  return (
    <div className="w-full flex justify-center items-center">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="w-full max-w-2xl border border-gray-400 rounded-md shadow-md ">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
