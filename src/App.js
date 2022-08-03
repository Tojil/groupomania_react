import logo from '../src/assets/icon_primaire.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Groupomania </h1>
        <h2>Soyez le bienvenue</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrez
        </a>
      </header>
    </div>
  );
}

export default App;
