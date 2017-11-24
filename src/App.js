import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Create from './Create';
import Session from './Session';
import Name from './Name';

import theme from './theme';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${theme.colours.background};
`;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(95% - 1em);
  max-width: 768px;
  position: relative;
  padding-top: 5em;
  margin: 0 1em;

  color: ${theme.colours.text};
  font-family: ${theme.fonts.text};

  h1#banner {
    font-family: ${theme.fonts.banner};
    color: ${theme.colours.secondary};
    position: absolute;
    top: 0;
    left: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.title};
    color: ${theme.colours.primarydark};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      display: block;
      margin: 0.5em 0;
    }

    label {
      > input {
        display: block;
      }
    }

    input {
    }

    button {
    }
  }
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
            <Link to="/"><h1 id="banner">PUSH TO TALK</h1></Link>
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
