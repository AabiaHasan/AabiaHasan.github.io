import logo from './aabia.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{fontFamily: 'Fira Sans'}}>
         Hello my name is Aabia, I'm a BME and CSE student at UofM!
        </p>
        <p style={{fontFamily: 'Fira Sans'}}>
        Website Under Construction
        </p>
        <a href="https://www.linkedin.com/in/aabiahasan/">
        <i class="fab fa-linkedin"></i>
        </a>
      </header>
    </div>
  );
}

export default App;
