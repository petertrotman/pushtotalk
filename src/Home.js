import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      display: block;
      margin: 0.5em 0;
    }

    input {
    }

    button {
    }
  }
`;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      sessionId: '',
    };
  }

  handleUserChange(e) {
    return this.props.handleChangeUser(e.target.value);
  }

  handleSessionIdChange(e) {
    return this.setState({ sessionId: e.target.value });
  }

  handleJoin(e) {
    e.preventDefault();
    return this.props.history.push({
      pathname: `/session/${this.state.sessionId}`,
    });
  }

  handleNew(e) {
    e.preventDefault();
    return this.props.history.push({
      pathname: '/create',
    });
  }

  render() {
    return (
      <StyledHome>
        <h1>Push to Talk</h1>
        <form>
          <input type="text" id="username" placeholder="Your Name" value={this.props.user} onChange={e => this.handleUserChange(e)} />
          <input type="text" id="sessionid" placeholder="Session ID" value={this.state.sessionId} onChange={e => this.handleSessionIdChange(e)} />
          <button type="submit" onClick={e => this.handleJoin(e)}>Join session</button>
          <span>or</span>
          <button type="submit" onClick={e => this.handleNew(e)}>Create a new session</button>
        </form>
      </StyledHome>
    );
  }
}

Home.propTypes = {
  user: PropTypes.string.isRequired,
  handleChangeUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.function,
  }).isRequired,
};

export default Home;
