import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import Login from '../Login'
import Home from '../Home'

class Main extends Component {
  
  constructor(props) {
    super(props);
    this.oktaAuth = new OktaAuth({
      issuer: 'https://https://dev-41919537.okta.com/oauth2/default',
      clientId: '0oa8j10b34FnPINZ95d7',
      redirectUri: window.location.origin + '/callback'
    });
    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      props.history.replace(toRelativeUrl(originalUri, window.location.origin));
    };
  }
  
  render() {
    return (
      <Security oktaAuth={this.oktaAuth} restoreOriginalUri={this.restoreOriginalUri}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/callback" component={LoginCallback} />
          <SecureRoute path="/home" component={Home} />
        </Switch>
      </Security>
    );
  }
}

export default Main;