import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const { authenticateUser, storeToken } = useContext(AuthContext)

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
        const {data} = await axios.post("http://localhost:5005/auth/login", { username, password})

        /*  save token in localstorage */
        storeToken(data.token)
        await authenticateUser()
        navigate('/')
    } catch (error) {
        console.log(error)
        setErrorMessage(error.response.data.errorMessage)    
    }
  };
  
  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Username:
          <input value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button>Login</button>
      </form>
        {errorMessage ? <p style={{color: "red", fontSize: "0.8rem", fontWeight: "600"}}>{errorMessage}</p> : null}
    </>
  );
}

export default Login;
