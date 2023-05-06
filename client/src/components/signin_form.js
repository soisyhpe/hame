import React from 'react';

import '../assets/css/form.css'
import logo from '../assets/medias/hame_logo.svg';

function signinForm() {
  return (
    <div id='form-box'>
      <div id='form-content'>
        <div id='form-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
          <h1 class='form-title'>Authentifiez-vous</h1>
        </div>
        <form action='' method='post' id='form-sections'>
          <div id='form-section'>
            <div id='form-items'>
              <div id='form-item'>
                <label className='form-item-label'>Adresse mail</label>
                <input className='form-item-input' type='email' placeholder='prenom.nom@etu.sorbonne-universite.fr'></input>
              </div>
              <div id='form-item'>
                <label className='form-item-label'>Mot de passe</label>
                <input className='form-item-input' type='password' placeholder='monsupermotdepasse'></input>
              </div>
              <div id='form-item'>
                <a className='form-item-left' href='#'>Mot de passe oublié ?</a>
              </div>
            </div>
          </div>
          <div id='form-section'>
            <div id='form-items'>
              <div id='form-item'>
                <button className='form-item-button'>Connexion</button>
              </div>
            </div>
          </div>
        </form>
        <div id='form-footer'>
          <p className='form-item-footer'>Vous n'avez pas de compte ? <a href='#'>Inscrivez-vous</a> </p>
        </div>
      </div>
    </div>
  );
}

export default signinForm;