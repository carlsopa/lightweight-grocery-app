import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import ControlBar from './controlBar';
import GroceryPanel from './listPanel';
import links from './linkBar';

export default function App() {
  return (
    <React.Fragment>
      <ControlBar />
      <GroceryPanel />
      <links />
    </React.Fragment>
    // <div className="App">
      // <header className="App-header">
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header>
    // </div>
  );
}

// export default App;
