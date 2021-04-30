import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { useStore } from './store';

import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';


function App() {
  return (
    <div className="App">      
      <Switch>
        <Route component={NotFoundPage} />
      </Switch>
     </div>
  );
}



export default App;
