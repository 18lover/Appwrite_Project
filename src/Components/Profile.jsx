import React, { useEffect, useState } from 'react';
import { account } from '../Appwrite/AppwriteConfig';
import { useNavigate ,Link} from 'react-router-dom';
import Todoform from './Todoform';
import Todos from './Todos';

function Profile() {
    const navigate = useNavigate()
    const [userDetail , setUserDetail] = useState()

    useEffect(()=>{
        const getData = account.get()
        getData.then(
            function(response){
                setUserDetail(response)
            },
            function(error){
                console.log(error);
            }
        )
    },[])

    const handleLogout=async ()=>{
        try {
            await account.deleteSession("current")
            navigate("/")
        } catch (error) {
            console.log(error)            
        }
    }
  return (
   <>
      {userDetail ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetail.name}</p>
            </div>
            <div>
              <button
                className="bg-red-400 text-white p-1 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* TODO FORM */}
          <Todoform />
          {/* TODOS BOX */}
          <Todos />
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>

  )
}

export default Profile

