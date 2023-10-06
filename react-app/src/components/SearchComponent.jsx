import React, { useEffect, useState } from "react";
import ErrorMsj from "./ErrorMsj";
import BarChar from "./BarChar";

const SearchComponent = () => {
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);

  const URL = "http://localhost:3001/show-users";

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUser(data.items);
  };

  //fetch users search with their followers
  const fetchUser = async () => {
    try {
      const searchResponse = await fetch(
        "https://api.github.com/search/users?q=YOUR_NAME"
      );
      const searchData = await searchResponse.json();
      const logins = searchData.items.map((user) => user.login);

      const userPromises = logins.map((login) =>
        fetch(`https://api.github.com/users/${login}`).then((response) =>
          response.json()
        )
      );

      const userDataArray = await Promise.all(userPromises);
      setDataUsers(userDataArray);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const searcher = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "doublevpartners") {
      setError(true);
    } else {
      setSearch(inputValue);
      setError(false);
    }
  };

  let results = [];

  if (!search) {
    results = users;
  } else {
    results = users.filter((data) =>
      data.login.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    showData();
    fetchUser();
  }, []);

  return (
    <div>
      <div className="mt-10 mb-5">
        <input
          type="text"
          placeholder="Search name..."
          className="input input-bordered input-accent w-full max-w-xs h-10 px-5"
          value={search}
          onChange={searcher}
        />
      </div>
      <a
        href="/user/selected"
        className="hover:border-b-4 hover:border-violet-200 mt-5 "
      >
        Show Selected Users
      </a>
      <div className="flex justify-center mt-5">
        {error && <ErrorMsj>Error</ErrorMsj>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5">
        {results.map((user) => (
          <div
            className="bg-white flex flex-col justify-center items-center rounded-lg shadow-lg mt-10 mb-10 h-40 cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300"
            key={user.id}
          >
            <a href={`/user/${user.login}`}>
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
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center align-middle text-center">
        <h2 className=" capitalize text-4xl font-bold mt-10">
          bar chart of user followers
        </h2>
      </div>

      <div className=" flex justify-center align-middle mt-5 border-2 mx-20">
        <div className="mt-10">
          <BarChar data={dataUsers} />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
