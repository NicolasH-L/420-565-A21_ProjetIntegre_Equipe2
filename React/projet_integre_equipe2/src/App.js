import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

function App() {
  return (
      <div>
        {/*<NavbarHead/>*/}
        <Registration/>
        <Footer/>
      </div>
  );
}

export default App;
