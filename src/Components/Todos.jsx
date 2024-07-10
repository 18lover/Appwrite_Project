import React, { useEffect, useState } from "react";
import { databases } from "../Appwrite/AppwriteConfig";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await databases.listDocuments(
          "6686173e0035959fabf4",
          "66867ca9003a4f283471"
        );
        setTodos(response.documents);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument("6686173e0035959fabf4", "66867ca9003a4f283471", id);
      setTodos(todos.filter(todo => todo.$id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {todos &&
            todos.map((todo) => (
              <div key={todo.$id} className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                <div>
                  <p>{todo.Name}</p>
                </div>
                <div>
                  <span className="text-red-400 cursor-pointer" onClick={() => handleDelete(todo.$id)}>
                    Delete
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
