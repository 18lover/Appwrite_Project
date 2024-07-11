import React, { useEffect, useState } from "react";
import { account, databases } from "../Appwrite/AppwriteConfig"; // Adjust the import as needed

function Todos({refresh}) {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const user = await account.get();
        const userId = user.$id;

        const response = await databases.listDocuments(
          '6686173e0035959fabf4', // Replace with your database ID
          '66867ca9003a4f283471', // Replace with your collection ID
        );

        const userTodos = response.documents.filter(doc => doc.userId === userId);
        setTodos(userTodos);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };

    fetchTodos();
  }, [refresh]);

  const deleteTodo = async (todoId) => {
    try {
      await databases.deleteDocument(
        '6686173e0035959fabf4', // Replace with your database ID
        '66867ca9003a4f283471', // Replace with your collection ID
        todoId
      );

      // Remove the deleted todo from the state
      setTodos(todos.filter(todo => todo.$id !== todoId));
    } catch (error) {
      console.error(error);
      setError("Failed to delete todo. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>
          {todos.map(todo => (
            <div key={todo.$id}>
              <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                <div>
                  <p>{todo.Name}</p>
                </div>
                <div>
                  <span className="text-red-400 cursor-pointer" onClick={() => deleteTodo(todo.$id)}>
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
