import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { account, databases } from '../Appwrite/AppwriteConfig'; // Adjust the import as needed
import Todos from './Todos';

function Todoform() {
  const [todo, setTodo] = useState('');
  const [refresh, setRefresh] = useState(false); // To trigger refresh of Todos component


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = await account.get();
    const userId = user.$id;
    const response = await databases.createDocument(
      '6686173e0035959fabf4', // Replace with your database ID
      '66867ca9003a4f283471', // Replace with your collection ID
      uuidv4(), // Generate a unique ID for the document
      { Name:todo, userId } // Include userId in the document data
    );
    console.log(response);
    setRefresh(!refresh); 
  } catch (error) {
    console.error(error);
  }

  e.target.reset();
  setTodo(''); // Clear the state
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


