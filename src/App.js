import { Switch } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Stats from './views/Stats';
import Invoices from './views/Invoices';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route path='/stats' component={Stats} />
        <Route path='/invoices' component={Invoices} />
      </Switch>
    </Router>
  );
}
export default App;
