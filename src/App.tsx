import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import Home from './Home';
import Navbar from './Navbar';
import Profile from './Profile';
import { config } from './config';

const App: React.FC = () => (
  <Router>
    <Security {...config.oidc}>
      <Navbar />
      <Container text style={{ marginTop: '7em' }}>
        <Route path="/" exact component={Home} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <SecureRoute path="/profile" component={Profile} />
      </Container>
    </Security>
  </Router>
);
export default App;
