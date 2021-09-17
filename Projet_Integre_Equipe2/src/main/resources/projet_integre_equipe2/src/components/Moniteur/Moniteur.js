import React from 'react';
import PropTypes from 'prop-types';
import styles from './Moniteur.module.css';

const Moniteur = () => {
  return (
  <div className={styles.Moniteur}>
    Moniteur Component
    <h1>Formulaire</h1>
    {/* <form onSubmit={}> */}
    <form>
        <label>
          Name:
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        </label>
        <input type="submit" value="Submit" />
    </form>
  </div>
  )
}

Moniteur.propTypes = {};

Moniteur.defaultProps = {};

export default Moniteur;
