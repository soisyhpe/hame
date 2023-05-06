import React from 'react';

import './assets/css/modal.css';

const Modal = (title, content) => {

  // render
  return (
    <div id='alert-box'>
      <div id='alert-content'>
        <section id='alert-header'>
          <h1 className='alert-title'>${title}</h1>
        </section>

        <section id='alert-section'>
          <p>${content}</p>
        </section>

        <section id='alert-section'>
          <div id='alert-item'>
            <button id='submit' type='submit' className='form-item-button'>S'inscrire</button>
          </div>
        </section>
      </div>
    </div>
  )
};

export default Modal;