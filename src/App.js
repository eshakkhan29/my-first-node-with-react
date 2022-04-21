import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handelPost = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const job = event.target.job.value;
    const user = { name, job }

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
  }




  return (
    <div className="App">
      <h1>All user</h1>
      <form onSubmit={handelPost}>
        <input type="text" name='name' placeholder='name' />
        <input type="text" name='job' placeholder='job' />
        <input type="submit" value="Send" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.id}, name: {user.name}, job: {user.job}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
