import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      sessionId: '',
    };
  }

  handleUserChange(e) {
    this.props.handleChangeUser(e.target.value);
  }

  handleSessionIdChange(e) {
    this.setState({ sessionId: e.target.value });
  }

  handleJoin(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: `/session/${this.state.sessionId}`,
    });
  }

  handleNew(e) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/create',
    });
  }

  render() {
    return (
      <div>
        <h1>Push to Talk</h1>
        <form>
          <input type="text" id="username" placeholder="Your Name" value={this.props.user} onChange={e => this.handleUserChange(e)} />
          <input type="text" id="sessionid" placeholder="Session ID" value={this.state.sessionId} onChange={e => this.handleSessionIdChange(e)} />
          <button type="submit" onClick={e => this.handleJoin(e)}>Join session</button>
          <span>or</span>
          <button type="submit" onClick={e => this.handleNew(e)}>Create a new session</button>
        </form>
      </div>
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