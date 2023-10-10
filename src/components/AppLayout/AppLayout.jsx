import React from "react";
import TodoForm from "../todos/TodoForm";
import TodoList from "../todos/TodoList";

const AppLayout = () => {
  return (
    <div className=" w-full h-full">
      <div className="container h-screen mx-auto xl:max-w-screen-xl p-2 -200">
        <div className=" flex flex-col items-center p-3">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
