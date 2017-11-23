import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from 'firebase/app';

import User from './User';

const StyledSession = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Session extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      sessionId: match.params.sessionId,
      owner: '',
      users: [],
      requests: [],
    };
  }

  componentDidMount() {
    if (!this.state.sessionId || !this.props.user) { return; }

    const ref = firebase
      .database()
      .ref('sessions')
      .child(this.state.sessionId);

    ref
      .child('owner')
      .once('value', (dataSnapshot) => { this.setState({ owner: dataSnapshot.val() }); });

    const users = ref.child('users');

    users
      .once('value')
      .then((dataSnapshot) => {
        const val = dataSnapshot.val();
        if (val != null) {
          users.set(val.concat(this.props.user));
        } else {
          users.set([this.props.user]);
        }
      });

    users
      .on('value', (dataSnapshot) => {
        const val = dataSnapshot.val();
        if (val != null) {
          this.setState({ users: val });
        } else {
          this.setState({ users: [] });
        }
      });

    ref
      .child('requests')
      .on('value', (dataSnapshot) => {
        const val = dataSnapshot.val();
        if (val != null) {
          this.setState({ requests: val });
        } else {
          this.setState({ requests: [] });
        }
      });
  }

  handleRequest(user) {
    let newRequests = [];
    if (this.state.requests.includes(user)) {
      newRequests = this.state.requests.filter(u => u !== user);
    } else {
      newRequests = this.state.requests.concat(user);
    }

    firebase
      .database()
      .ref('sessions')
      .child(this.state.sessionId)
      .child('requests')
      .set(newRequests);
  }

  render() {
    if (!this.state.owner) { return <h2>Connecting...</h2>; }

    return (
      <StyledSession>
        <h2>{ this.state.owner }&rsquo;s session.</h2>
        { this.state.users.map(user => (
          <User
            key={user}
            name={user}
            self={this.props.user === user}
            owner={this.props.user === this.state.owner}
            request={this.state.requests.includes(user)}
            handleRequest={() => this.handleRequest(user)}
          />
        )) }
      </StyledSession>
    );
  }
}

Session.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Session;
