import React, { useEffect } from 'react';
import './App.css';
import ContainerCMS from './ContainerCMS';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  useEffect(() => {

  }, [])
  return (
    <Router>
      <div className="App">
        <ContainerCMS>
        </ContainerCMS>
      </div>
    </Router>
  );
}

export default App;
