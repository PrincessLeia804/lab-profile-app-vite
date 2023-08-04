import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [campus, setCampus] = useState("")
    const [course, setCourse] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await axios.post("http://localhost:5005/auth/signup", { username, password, campus, course})
            navigate('/login')
        } catch (error) {
            setErrorMessage(error.response.data.errorMessage)    
        }
      };

  return (
    <>
      <h3>SignUp</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label>
          Campus:
          <input value={campus} onChange={(event) => setCampus(event.target.value)} />
        </label>
        <label>
          Course:
          <input value={course} onChange={(event) => setCourse(event.target.value)} />
          </label>
        <button>Sign Up</button>
      </form>
        {errorMessage ? <p style={{color: "red", fontSize: "0.8rem", fontWeight: "600"}}>{errorMessage}</p> : null}
    </>
  );
}

export default SignUp;
