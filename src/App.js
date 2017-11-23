import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Create from './Create';
import Session from './Session';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  handleChangeUser(newValue) {
    this.setState({ user: newValue });
  }

  withUser(Component) {
    return props => (
      <Component
        {...props}
        user={this.state.user}
        handleChangeUser={newVal => this.handleChangeUser(newVal)}
      />
    );
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={this.withUser(Home)} />
          <Route path="/create" render={this.withUser(Create)} />
          <Route path="/session/:sessionId?" render={this.withUser(Session)} />
        </div>
      </Router>
    );
  }
}

export default App;
