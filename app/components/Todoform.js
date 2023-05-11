"use client";
import { useState } from "react";

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, completed: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-8">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter Todo"
        className="mr-4 p-2 rounded border-2 border-gray-300"
      />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Add Todo
      </button>
    </form>
  );
};
export default TodoForm;
