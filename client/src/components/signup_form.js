import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../assets/css/form.css';
import logo from '../assets/medias/hame_logo.svg';

import { useState, useEffect } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../tools/validation_tools';

const SignupForm = () => {
  // initialize states
  const [userData, setUserData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    username: '',
    password: '',
    confirm_password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    username: '',
    password: '',
    confirm_password: ''
  });

  useEffect(() => {
    //setUserData( prevValues => { return { ...prevValues, [event.target.name]: event.target.value } });

    // test for email
    if (userData.email !== '' && !EMAIL_REGEX.test(userData.email)) {
      setFormErrors( prevValues => { return { ...prevValues, email: "Invalid email address" } });
      document.getElementById("email").style.borderColor = "rgb(207, 94, 94)";
    } else {
      setFormErrors( prevValues => { return { ...prevValues, email: "" } });
      document.getElementById("email").style.borderColor = null;
    }

    // todo : test for firstname
    // todo : test for lastname
    // todo : test for birthdate
    // todo : test for username
    // todo : test for birthdate

    // test for password
    if (userData.password !== '' && !PASSWORD_REGEX.test(userData.password)) {
      setFormErrors( prevValues => { return { ...prevValues, password: 'Invalid password. <ul>\n<li>It must be a least 6 characters long,</li>\n<li>one uppercase letter,</li>\n<li>one lowercase letter,</li>\n<li>one numeric digit and cannot contain any whitespace characters.</li>\n</ul>' } });
      document.getElementById("password").style.borderColor = "rgb(207, 94, 94)";
    } else {
      setFormErrors( prevValues => { return { ...prevValues, password: "" } });
      document.getElementById("password").style.borderColor = null;
    }

    // test for confirm password
    if (userData.confirm_password !== '' && !(userData.confirm_password === userData.password)) {
      setFormErrors( prevValues => { return { ...prevValues, confirm_password: "Passwords doesn't match together."} });
      document.getElementById("confirm_password").style.borderColor = "rgb(207, 94, 94)";
    } else {
      setFormErrors( prevValues => { return { ...prevValues, confirm_password: "" } });
      document.getElementById("confirm_password").style.borderColor = null;
    }

    /*if (formErrors.email === '' && formErrors.firstname === '' && formErrors.lastname === '' && formErrors.birthdate === '' && formErrors.username === '' && formErrors.password === '' && formErrors.confirm_password === '') {
      document.getElementById('submit').disabled = "false";
    }*/
  }, [userData]);;

  const updateUserData = (event) => {
    setUserData( prevValues => { return { ...prevValues, [event.target.name]: event.target.value } });
  }

  const submitForm = (event) => {
    event.preventDefault();
    console.log("user: ", userData)
    console.log("errors:", formErrors)

    // document.body.insertAdjacentHTML('beforebegin', '<p>Coucou</p>');
    
    axios.post('http://localhost:8000/v1/users/', {
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        birthdate: userData.birthdate,
        username: userData.username,
        password: userData.password,
        confirm_password: userData.confirm_password,
        creation_date: new Date()
      })
      .catch((err) => {
        // todo : show error message
      })
      .then((response) => {
        // todo : redirect to home page
      });
  };

  // render
  return (
    <div className='form-box'>
      <div className='form-content'>
        <section className='form-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
          <h1 className='form-title'>Inscrivez-vous</h1>
        </section>

        <form onSubmit={submitForm}>
          <section className='form-section'>
            <div className='form-item'>
              <label className='form-item-label'>Adresse mail</label>
              <input 
                type='email' 
                name='email'
                id='email'
                value={userData.email} 
                onChange={event => updateUserData(event)} 
                placeholder='prenom.nom@etu.sorbonne-universite.fr'
                className='form-item-input'/>
              <p id='email' className='form-item-error'>{ formErrors.email && formErrors.email }</p>
            </div>
            <div className='form-item'>
              <label className='form-item-label'>Prénom</label>
              <input 
                type='text'
                name='firstname'
                id='firstname'
                value={userData.firstname} 
                onChange={event => updateUserData(event)} 
                className='form-item-input'/>
              <label className='form-item-label'>Nom</label>
              <input 
                type='text'
                name='lastname'
                id='lastname'
                value={userData.lastname} 
                onChange={event => updateUserData(event)} 
                className='form-item-input'/>
            </div>
            <div className='form-item'>
              <label className='form-item-label'>Date de naissance</label>
              <input 
                type='date' 
                name='birthdate' 
                id='birthdate' 
                value={userData.birthdate} 
                onChange={event => updateUserData(event)} 
                className='form-item-input-date'/>
            </div>
          </section>

          <section className='form-section'>
            <div className='form-item'>
              <label className='form-item-label'>Pseudo</label>
              <input 
                type='text' 
                id='username' 
                name='username'
                value={userData.username} 
                onChange={event => updateUserData(event)} 
                className='form-item-input'/>
            </div>
          </section>

          <section className='form-section'>
            <div className='form-item'>
              <label className='form-item-label'>Mot de passe</label>
              <input 
                type='password' 
                id='password' 
                name='password' 
                value={userData.password} 
                onChange={event => updateUserData(event)} 
                className='form-item-input'/>
              <p id='password' className='form-item-error' dangerouslySetInnerHTML={{__html: formErrors.password}}></p>
            </div>
            <div className='form-item'>
              <label className='form-item-label'>Confirmer le mot de passe</label>
              <input 
                type='password' 
                id='confirm_password' 
                name='confirm_password' 
                value={userData.confirm_password} 
                onChange={event => updateUserData(event)} 
                className='form-item-input'/>
              <p id='confirm_password' className='form-item-error'>{ formErrors.confirm_password && formErrors.confirm_password }</p>
            </div>
          </section>

          <section className='form-section'>
            <div className='form-item'>
              <button id='submit' type='submit' className='form-item-button'>S'inscrire</button>
            </div>
          </section>
        </form>

        <section className='form-footer'>
          <p className='form-item-footer'>Déjà un compte ? <Link to='/'>Connectez-vous</Link> </p> 
        </section>
      </div>
    </div>
  );
}

export default SignupForm;