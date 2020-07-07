import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const handleSubmit = (pic) => {
    axios.post('http://localhost:3000/api/avatars', pic)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <div>
      <form>
        <label for="avatar">Choose a profile picture:</label>

        <input type="file"
        id="avatar" name="avatar"></input>
        <button onClick={() => handleSubmit()}></button>
      </form>
    </div>

  );
}

export default App;
