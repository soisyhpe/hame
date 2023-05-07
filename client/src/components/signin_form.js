import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/form.css'
import logo from '../assets/medias/hame_logo.svg';

import { EMAIL_REGEX, PASSWORD_REGEX } from '../tools/validation_tools';

const Signin = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // test for email
    if (userCredentials.email !== '' && !EMAIL_REGEX.test(userCredentials.email)) {
      setFormErrors( prevValues => { return { ...prevValues, email: "Invalid email address" } });
      document.getElementById("email").style.borderColor = "rgb(207, 94, 94)";
    } else {
      setFormErrors( prevValues => { return { ...prevValues, email: "" } });
      document.getElementById("email").style.borderColor = null;
    }

    // test for password
    if (userCredentials.password !== '' && !PASSWORD_REGEX.test(userCredentials.password)) {
      setFormErrors( prevValues => { return { ...prevValues, password: 'Invalid password' } });
      document.getElementById("password").style.borderColor = "rgb(207, 94, 94)";
    } else {
      setFormErrors( prevValues => { return { ...prevValues, password: "" } });
      document.getElementById("password").style.borderColor = null;
    }
  }, [userCredentials]);

  useEffect(() => {
    const response = fetch('http://localhost:8000/v1/sessions/autoLogin', {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }, []);

  const updateUserCredentials = (event) => {
    setUserCredentials( prevValues => { return { ...prevValues, [event.target.name]: event.target.value } });
  }

  const handleSignin = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/v1/sessions/login', {
        email: userCredentials.email,
        password: userCredentials.password
      })
      .catch((err) => {
        alert(err);
      })
      .then((response) => {
        if (response.status === 200) navigate('/home');
      });
  }

  return (
    <div className='form-box'>
      <div className='form-content'>
        <section className='form-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
          <h1 className='form-title'>Authentifiez-vous</h1>
        </section>
        <form onSubmit={handleSignin} className='form-sections'>
          <div className='form-section'>
            <div className='form-items'>
              <div className='form-item'>
                <label className='form-item-label'>Adresse mail</label>
                <input 
                  name='email'
                  id='email'
                  value={userCredentials.email}
                  className='form-item-input' 
                  type='email' 
                  onChange={event => updateUserCredentials(event)} 
                  placeholder='prenom.nom@etu.sorbonne-universite.fr'/>
                <p id='email' className='form-item-error'>{ formErrors.email && formErrors.email }</p>
              </div>
              <div className='form-item'>
                <label className='form-item-label'>Mot de passe</label>
                <input
                  name='password'
                  id='password'
                  value={userCredentials.password}
                  className='form-item-input'
                  type='password'
                  onChange={event => updateUserCredentials(event)}/>
                <p id='password' className='form-item-error'>{ formErrors.password && formErrors.password }</p>
              </div>
              <div className='form-item'>
                <a className='form-item-left' href='#'>Mot de passe oublié ?</a>
              </div>
            </div>
          </div>
          <div className='form-section'>
            <div className='form-items'>
              <div className='form-item'>
                <button id='submit' type='submit' className='form-item-button'>Connexion</button>
              </div>
            </div>
          </div>
        </form>
        <div className='form-footer'>
          <p className='form-item-footer'>Vous n'avez pas de compte ? <Link to='/signup'>Inscrivez-vous</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;