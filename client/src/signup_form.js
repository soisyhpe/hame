import './assets/css/form.css'
import logo from './assets/medias/hame_logo.svg';

function signupForm() {
  return (
    <div id='form-box'>
      <div id='form-content'>
        <div id='form-header'>
          <img src={logo} alt='Hame logo' height='25px'/>
          <h1 class='form-title'>Inscrivez-vous</h1>
        </div>
        <form action='' method='post' id='form-sections'>
          <div id='form-section'>
            <div id='form-items'>
              <div id='form-item'>
                <label className='form-item-label'>Adresse mail</label>
                <input className='form-item-input' type='email' placeholder='prenom.nom@etu.sorbonne-universite.fr'></input>
              </div>
              <div id='form-item' className='form-item-inline'>
                <label className='form-item-label'>Prénom</label>
                <input className='form-item-input' type='text' placeholder='Eros'></input>
                <label className='form-item-label'>Nom</label>
                <input className='form-item-input' type='text' placeholder='Chan'></input>
              </div>
              <div id='form-item'>
                <label className='form-item-label'>Date de naissance</label>
                <input type='date' id='birthdate' className='form-item-input-date'></input>
              </div>
            </div>
          </div>
          <div id='form-section'>
            <div id='form-items'>
              <div id='form-item'>
                <label className='form-item-label'>Pseudo</label>
                <input type='text' id='username' className='form-item-input'></input>
              </div>
            </div>
          </div>
          <div id='form-section'>
            <div id='form-items'>
              <div id='form-item'>
                <label className='form-item-label'>Mot de passe</label>
                <input type='password' id='password' className='form-item-input'/>
              </div>
              <div id='form-item'>
                <label className='form-item-label'>Confirmer le mot de passe</label>
                <input type='password' className='form-item-input'/>
              </div>
            </div>
          </div>
          <div id='form-section'>
            <div id='form-items'>
              <div id='form-item'>
                <button type='submit' className='form-item-button'>S'inscrire</button>
              </div>
            </div>
          </div>
        </form>
        <div id='form-footer'>
          <p className='form-item-footer'>Déjà un compte ? <a href='#'>Connectez-vous</a> </p> 
        </div>
      </div>
    </div>
  );
}

export default signupForm;