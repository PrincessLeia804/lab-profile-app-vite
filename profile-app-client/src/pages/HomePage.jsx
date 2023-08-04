import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';

function HomePage() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
    console.log('isLoggedIn: ', isLoggedIn);
    console.log('user: ', user);

    // const storePhoto = () => {
        
    // }

  return (
    <div>
      <h3>IronProfile</h3>
      <p>some Text</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  )
}

export default HomePage;
