/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



const firebaseConfig = {
    apiKey: "AIzaSyD3boU7FdCYkLGM03X9oW964C_fv8TQDEU",
    authDomain: "mern-social-login-3c59b.firebaseapp.com",
    projectId: "mern-social-login-3c59b",
    storageBucket: "mern-social-login-3c59b.appspot.com",
    messagingSenderId: "407842871709",
    appId: "1:407842871709:web:4f1a2d5c907fde236a3774",
    measurementId: "G-N72G7D7CHE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const content = document.getElementById('content');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const handleRegisterClick = () => {
      content.classList.add("active");
    };

    const handleLoginClick = () => {
      content.classList.remove("active");
    };

    registerBtn.addEventListener('click', handleRegisterClick);
    loginBtn.addEventListener('click', handleLoginClick);

    return () => {
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/register', { name, email, password });
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', { email, password });
      const userId = response.data.userId;
      if (userId) {
        navigate(`/profile/${userId}`);
      } else {
        alert('Login successful, but user ID is missing.');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = result.user;
      const response = await axios.post('http://localhost:8081/api/google-login', {
        name: displayName,
        email,
        googleId: uid,
      });
      const userId = response.data.userId;
      if (userId) {
        navigate(`/profile/${userId}`);
      } else {
        alert('Google Sign-In successful, but user ID is missing.');
      }
    } catch (error) {
      alert('Google Sign-In failed');
    }
  };

  return (
    <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
      {/* Register form */}
      <div className='col-md-6 d-flex justify-content-center'>
        <form onSubmit={handleRegister}>
          <div className='header-text mb-4'>
            <h1>Create Account</h1>
          </div>
          <div className='input-group mb-3'>
            <input type='text' placeholder='Name' className='form-control form-control-lg bg-light fs-6' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='input-group mb-3'>
            <input type='email' placeholder='Email' className='form-control form-control-lg bg-light fs-6' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-group mb-3'>
            <input type='password' placeholder='Password' className='form-control form-control-lg bg-light fs-6' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <button type="submit" className='btn border-white text-white w-50 fs-6'>
              Register
            </button>
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </form>
      </div>

      {/* Login form */}
      <div className='col-md-6 right-box'>
        <form onSubmit={handleLogin}>
          <div className='header-text mb-4'>
            <h1>Sign In</h1>
          </div>
          <div className='input-group mb-3'>
            <input type='email' placeholder='Email' className='form-control form-control-lg bg-light fs-6' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-group mb-3'>
            <input type='password' placeholder='Password' className='form-control form-control-lg bg-light fs-6' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {/*<div className='input-group mb-5 d-flex justify-content-between'>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' />
              <label htmlFor='formcheck' className='form-check-label text-secondary'><small>Remember me</small></label>
            </div>
            <div className='forgot'>
              <small><a href='#'>Forgot password?</a></small>
            </div>
          </div>*/}
          <div className='input-group mb-3 justify-content-center'>
            <button type="submit" className='btn border-white text-white w-50 fs-6'>
              Login
            </button>
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </form>
      </div>

      {/* Switch panel */}
      <div className='switch-content'>
        <div className='switch'>
          <div className='switch-panel switch-left'>
            <h1>Hello, Again</h1>
            <p>We are happy to see you back</p>
            <button className='hidden btn border-white text-white w-50 fs-6' id='login'>Login</button>
          </div>
          <div className='switch-panel switch-right'>
            <h1>Welcome</h1>
            <p>Join Our Unique Platform, Explore a new Experience</p>
            <button className='hidden btn border-white text-white w-50 fs-6' id='register'>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;