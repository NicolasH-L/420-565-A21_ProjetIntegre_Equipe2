import React from 'react';
import PropTypes from 'prop-types';
import styles from './Moniteur.module.css';

const Moniteur = () => {
  return (
    <div className={styles.Moniteur}>
      Moniteur Component
      <h1>Formulaire</h1>
      {/* <form onSubmit={}> */}
      <form class="col-md-6">
        <div class="form-group">
          <label>Nom:</label>
          <input type="text" className="form-control" />
        </div>
        <div class="form-group">
          <label>Prénom:</label>
          <input type="text" className="form-control" />
        </div>
        <div class="form-group">
          <label>Mot de Passe:</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div class="form-group">
          <label>Nom de l'entreprise:</label>
          <input type="text" className="form-control" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

Moniteur.propTypes = {};

Moniteur.defaultProps = {};

export default Moniteur;
