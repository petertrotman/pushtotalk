import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      sessionId: null,
      error: null,
    };
  }

  componentDidMount() {
    if (!this.props.user || this.props.user === '') {
      this.props.handleChangeUser('New User');
    }

    firebase
      .database()
      .ref('sessions')
      .push({
        owner: this.props.user || 'New User',
        users: [],
        requests: [],
      })
      .then((ref) => { this.setState({ sessionId: ref.key }); })
      .catch((e) => { this.setState({ error: e }); });
  }

  render() {
    if (this.state.error) {
      return <h2>An error occurred</h2>;
    }

    if (!this.state.sessionId) {
      return <h2>Creating new session...</h2>;
    }

    const sessionUrl = `/session/${this.state.sessionId}`;

    return (
      <div>
        <h2>Hello, { this.props.user }!</h2>
        <h2>Your new session ID is: { this.state.sessionId }</h2>
        <Link to={sessionUrl} href={sessionUrl}>Join your session</Link>
      </div>
    );
  }
}

Create.propTypes = {
  user: PropTypes.string.isRequired,
  handleChangeUser: PropTypes.func.isRequired,
};

export default Create;
