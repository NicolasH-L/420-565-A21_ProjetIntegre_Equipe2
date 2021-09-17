import './App.css';
import Moniteur from './components/Moniteur/Moniteur.js'
import StudentRegistration from './StudentRegistration.js'

function App() {
  return (
    <div class="container-fluid">
      <StudentRegistration/>
      <Moniteur>
      </Moniteur>
    </div>
  );
}

export default App;
