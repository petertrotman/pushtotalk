import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Create from './Create';
import Session from './Session';
import Name from './Name';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 768px;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: window.localStorage.getItem('user') || '',
    };
  }

  handleChangeUser(newValue) {
    window.localStorage.setItem('user', newValue);
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
        <LayoutContainer>
          <StyledApp>
            <Route exact path="/" render={this.withUser(Home)} />
            <Route path="/create" render={this.withUser(Create)} />
            <Route exact path="/session/:sessionId" render={this.withUser(Session)} />
            <Route path="/session/:sessionId/name" render={this.withUser(Name)} />
          </StyledApp>
        </LayoutContainer>
      </Router>
    );
  }
}

export default App;
