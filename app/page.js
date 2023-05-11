"use client";
import { useState, useEffect } from "react";
import TodoForm from "./components/Todoform";
import axios from "axios";

const TodosPage = () => {
  const { localStorage } = window;
  const [todos, setTodos] = useState([]);
  const [User, setUser] = useState("");

  const fetchusertodos = async () => {
    const check = localStorage.getItem("todouser");

    if (check) {
      const user = JSON.parse(check);
      setUser(user);
      try {
        const token = user.token;
        const config = {
          headers: {
            authorization: token,
          },
        };
        // Make the GET request to the /todos endpoint with the token and userid as query parameters
        const response = await axios.get(
          "https://todo-server-f6oc.onrender.com/todos",
          config
        );
        setTodos(response.data.todos);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchusertodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const data = {
        title: newTodo.title,
      };
      const token = User.token;
      const config = {
        headers: {
          authorization: token,
        },
      };
      // Make the GET request to the /todos endpoint with the token and userid as query parameters
      const response = await axios.post(
        "https://todo-server-f6oc.onrender.com/todos",
        data,
        config
      );
      fetchusertodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = (id) => {
    const token = User.token;
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .delete(`https://todo-server-f6oc.onrender.com/todos/${id}`, config)
      .then((response) => {
        console.log(response.data); // Should print {message: 'Todo deleted'}
        fetchusertodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMarkAsCompleted = async (id) => {
    const updatedTodo = todos.filter((todo) => {
      if (todo._id === id) {
        return todo;
      }
    });
    updatedTodo[0].completed = !updatedTodo[0].completed;
    try {
      const data = updatedTodo[0];
      const token = User.token;
      const config = {
        headers: {
          authorization: token,
        },
      };
      // Make the GET request to the /todos endpoint with the token and userid as query parameters
      await axios.put(
        `https://todo-server-f6oc.onrender.com/todos/${id}`,
        data,
        config
      );
      fetchusertodos();
      console.log("success");
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleout = () => {
    localStorage.setItem("todouser", "");
    setTodos([]);
    setUser("");
  };
  return (
    <div className="flex flex-col items-center">
      {!User ? (
        <h1 className="text-xl font-bold mt-8 mb-4">
          Please register or login to use the App
        </h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold mt-8 mb-4">Todos Page</h1>
          <TodoForm onSubmit={handleAddTodo} />
          <ul className="w-full max-w-md mt-8">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-slate-500 p-4 rounded-lg shadow mb-4"
              >
                <p
                  className={`flex-1 text-lg ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </p>
                <div className="flex">
                  {!todo.completed && (
                    <button
                      onClick={() => handleMarkAsCompleted(todo._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                    >
                      Done
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleout}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default TodosPage;
