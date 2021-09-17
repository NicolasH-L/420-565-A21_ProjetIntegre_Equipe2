import React from 'react';
import PropTypes from 'prop-types';
import styles from './Moniteur.module.css';

const Moniteur = () => {
  return (
  <div className={styles.Moniteur}>
    Moniteur Component
<<<<<<< HEAD
    <h1>
    Formulaire
    </h1>
    
    
=======
    <h1>Formulaire</h1>
    {/* <form onSubmit={}> */}
    <form>
        <label>
          Name:
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        </label>
        <input type="submit" value="Submit" />
    </form>
>>>>>>> eeb6522c6cb55acb7bfa64312f557dd2564bc7d5
  </div>
  )
}

Moniteur.propTypes = {};

Moniteur.defaultProps = {};

export default Moniteur;
