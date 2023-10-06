import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { toast } from "react-toastify";

const UserDetail = () => {
  const { login } = useParams();
  const [users, setUser] = useState([]);

  const notifyDelete = () => toast("The user was deleted correctly");
  const notifyAddUser = () => toast("The user was added correctly");
  const notifyUserNotFound = () => toast("User not found");

  const detailUserData = async () => {
    const response = await fetch(`https://api.github.com/users/${login}`);
    const data = await response.json();
    // console.log(data)
    setUser(data);
  };

  const handleSaveUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });

      if (response.ok) {
        notifyAddUser();
      } else {
        console.error("Error saved the user");
        notifyUserNotFound();
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });
      if (response.ok) {
        notifyDelete();
      } else {
        console.error("Error saved the user");
        notifyUserNotFound();
      }
    } catch (error) {
      console.error("Error of red:", error);
    }
  };

  useEffect(() => {
    detailUserData();
  }, []);

  return (
    <>
      <div className="flex justify-between  m-5">
        <a href="/">
          <AiOutlineArrowLeft className="w-10 h-10 hover:text-blue-500" />
        </a>
        <div className="flex justify-end">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-5"
            onClick={handleSaveUser}
          >
            Save User
          </button>
          <button
            className="bg-transparent hover:bg-red-600 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-50 ">
        <div className="mt-10 max-w-md bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
          <div className="px-10 py-8">
            <img
              src={users.avatar_url}
              alt={users.login}
              className="rounded-xl  w-60"
            />
          </div>

          <div className="flex justify-center align-middle p-6">
            <div className="flex flex-col items-center space-x-4">
              <h2 className="text-lg text-gray-900 font-bold text-center">
                {users.login}
              </h2>
              <span>Followers: {users.followers}</span>
              <span>Following: {users.following}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
