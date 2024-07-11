import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { databases } from '../Appwrite/AppwriteConfig'; 
import Todos from './Todos';

function Todoform() {
  const [todo, setTodo] = useState('');
  const [refresh, setRefresh] = useState(false); // To trigger refresh of Todos component

  useEffect(() => {
    // No need to do anything inside useEffect in this case
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await databases.createDocument(
        '6686173e0035959fabf4', 
        '66867ca9003a4f283471', 
        uuidv4(), 
        { Name: todo }
      );
      console.log(response);
      setRefresh(!refresh); // Toggle refresh state to re-render Todos component
    } catch (error) {
      console.error(error);
    }

    e.target.reset();
    setTodo('');
  };

  return (
    <>
    <div className="max-w-7xl mx-auto mt-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex justify-center mb-10"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
      <Todos refresh={refresh} /> {/* Pass refresh as a prop to Todos component */}
      </>
  );
}

export default Todoform;
