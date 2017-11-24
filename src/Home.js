import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

    this.form.querySelector('input#username').setAttribute('required', '');
    this.form.querySelector('input#sessionid').setAttribute('required', '');

    if (this.isFormValid()) {
      this.props.history.push(`/session/${this.state.sessionId}`);
    }
  }

  handleCreate(e) {
    e.preventDefault();

    this.form.querySelector('input#username').setAttribute('required', '');
    this.form.querySelector('input#sessionid').removeAttribute('required');

    if (this.isFormValid()) {
      this.props.history.push('/create');
    }
  }

  registerForm(el) {
    this.form = el;
  }

  isFormValid() {
    return Array
      .from(this.form.querySelectorAll('input'))
      .reduce((valid, el) => {
        if (!el.checkValidity()) {
          return false;
        }
        return valid;
      }, true);
  }

  render() {
    return (
      <StyledHome>
        <form ref={el => this.registerForm(el)}>
          <label htmlFor="username" type="text">
            Your Name
            <input
              type="text"
              id="username"
              placeholder="Your Name"
              value={this.props.user}
              onChange={e => this.handleUserChange(e)}
            />
          </label>
          <label htmlFor="sessionid" type="text">
            Session ID
            <input
              type="text"
              id="sessionid"
              placeholder="Session ID"
              value={this.state.sessionId}
              onChange={e => this.handleSessionIdChange(e)}
            />
          </label>
          <button type="submit" onClick={e => this.handleJoin(e)}>Join session</button>
          <span>or</span>
          <button type="submit" onClick={e => this.handleCreate(e)}>Create a new session</button>
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
