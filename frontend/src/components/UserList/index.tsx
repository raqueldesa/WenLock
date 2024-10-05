// /src/components/UserList.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const baseURL = `${import.meta.env.VITE_URL_BACKEND}/users`;

  useEffect(() => {
    // Fetch data from API using Axios
    axios
      .get(baseURL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
