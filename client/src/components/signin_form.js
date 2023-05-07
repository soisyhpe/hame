import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../assets/css/form.css'
import logo from '../assets/medias/hame_logo.svg';

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const response = fetch('http://localhost:8000/autoLogin', {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }, []);

  const handleSignin = () => {
    const response = fetch('')
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
                <input className='form-item-input' type='email' placeholder='prenom.nom@etu.sorbonne-universite.fr'></input>
              </div>
              <div className='form-item'>
                <label className='form-item-label'>Mot de passe</label>
                <input className='form-item-input' type='password' placeholder='monsupermotdepasse'></input>
              </div>
              <div className='form-item'>
                <a className='form-item-left' href='#'>Mot de passe oublié ?</a>
              </div>
            </div>
          </div>
          <div className='form-section'>
            <div className='form-items'>
              <div className='form-item'>
                <button className='form-item-button'>Connexion</button>
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