import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { AppScreen } from './pages/AppScreen';


function App() {
  return (
    <div className="App">      
      <Switch>
        <Route exact path="/" component={AppScreen} />
        <Route component={NotFoundPage} />
      </Switch>
     </div>
  );
}



export default App;
