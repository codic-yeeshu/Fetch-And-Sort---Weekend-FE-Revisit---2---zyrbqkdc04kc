import React, { useEffect, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    fetch("https://content.newtonschool.co/v1/pr/main/users")
      .then((res) => res.json())
      .then((data) => setUsers([...data]));
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    const sortData = () => {
      let newData;
      if (sortAscending) {
        newData = users.sort((a, b) => b.name.length - a.name.length);
      } else {
        newData = users.sort((a, b) => a.name.length - b.name.length);
      }
      setUsers([...newData]);
    };
    sortData();
  }, [sortAscending]);

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={() => setIsLoading(true)}>
        Fetch User Data
      </button>
      <button
        className="sort-btn"
        onClick={() => setSortAscending((prev) => !prev)}
      >
        {`Sort by name length (${!sortAscending ? "descending" : "ascending"})`}
      </button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="users-section">
          {users.map((user) => (
            <li key={user.id}>
              <section className="id-section">{user.id}</section>
              <section className="name-email-section">
                <p className="name">Name: {user.name}</p>
                <p className="email">Email: {user.email}</p>
              </section>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
