import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const UsersSelect = () => {
  const [usersSelected, setUsersSelected] = useState([]);
  const URL = "http://localhost:3001/list-of-users";

  const searhData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsersSelected(data);
  };

  useEffect(() => {
    searhData();
  });

  return (
    <div>
      {usersSelected.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex justify-between m-5">
            <a href="/">
              <AiOutlineArrowLeft className="w-10 h-10 hover:text-blue-500" />
            </a>
          </div>
          <h1 className="text-zinc-950 font-extrabold text-5xl my-11">No data Selected!</h1>
          <p>Please Select a User 😎</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between m-5">
            <a href="/">
              <AiOutlineArrowLeft className="w-10 h-10 hover:text-blue-500" />
            </a>
          </div>
          <div className="flex justify-center text-center">
            <h2 className="text-4xl font-bold">Users Selected</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5">
            {usersSelected.map((user) => (
              <a href={`/user/${user.login}`} key={user.id}>
                <div
                  className="bg-white flex flex-col justify-center items-center rounded-lg shadow-lg mt-10 mb-10 h-40 cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300"
                >
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 capitalize">
                    {user.login}
                  </h2>
                  <p className="text-gray-700">userId: {user.id}</p>
                  <div className="flex justify-center mt-5">
                    <img
                      src={user.avatar_url}
                      className="w-6 h-6 rounded-full"
                      alt={`Avatar for ${user.login}`}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersSelect;
