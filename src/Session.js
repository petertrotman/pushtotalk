import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { Redirect } from 'react-router';

import User from './User';

const StyledSession = styled.div`
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
`;

class Session extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      sessionId: match.params.sessionId,
      owner: '',
      users: [],
      requests: [],
      error: null,
    };
  }

  componentDidMount() {
    // Carry out the firebase init - if we have a valid user name
    if (this.props.user) { this.init(); }
  }

  init() {
    const ref = firebase
      .database()
      .ref('sessions')
      .child(this.state.sessionId);

    // Check that the session exists
    // Continue with init if it does
    // Set an error if it does not
    ref
      .once('value')
      .then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          // Check if the user is already in the session
          // Connect if it is
          // Set an error if it does not
          ref
            .child('users')
            .child(this.props.user)
            .once('value')
            .then((dataSnapshot2) => {
              if (dataSnapshot2.exists()) {
                this.setState({ error: 'USER_ALREADY_IN_SESSION' });
              } else {
                this.connect(ref);
              }
            });
        } else {
          this.setState({ error: 'SESSION_DOES_NOT_EXIST' });
        }
      });
  }

  connect(ref) {
    // Retrieve the channel owner's name
    ref
      .child('owner')
      .once('value', (dataSnapshot) => { this.setState({ owner: dataSnapshot.val() }); });

    // Add ourselves to the list of users
    ref
      .child('users')
      .child(this.props.user)
      .set(true);

    // Subscribe to the changing list of users
    ref
      .child('users')
      .on('value', (dataSnapshot) => {
        const val = dataSnapshot.val();
        if (val != null) {
          this.setState({ users: Object.keys(val) });
        } else {
          this.setState({ users: [] });
        }
      });

    // Subscribe to the changing list of requests
    ref
      .child('requests')
      .on('value', (dataSnapshot) => {
        const val = dataSnapshot.val();
        if (val != null) {
          this.setState({ requests: Object.keys(val) });
        } else {
          this.setState({ requests: [] });
        }
      });

    // Register to remove ourselves from the users list on disconnect
    ref
      .child('users')
      .child(this.props.user)
      .onDisconnect()
      .remove();

    // Register to remove our request from the requests list on disconnect
    ref
      .child('requests')
      .child(this.props.user)
      .onDisconnect()
      .remove();
  }


  handleRequest(user) {
    // Check to see if we already have an active request for this user
    // If we do, then cancel it
    // If we don't, then add one
    const ref = firebase
      .database()
      .ref('sessions')
      .child(this.state.sessionId)
      .child('requests')
      .child(user);

    ref
      .once('value')
      .then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          ref.remove();
        } else {
          ref.set(true);
        }
      });
  }

  render() {
    if (!this.props.user) {
      return <Redirect to={`${window.location.pathname}/name`} />;
    }

    if (this.state.error) {
      return (
        <div>
          <h2>An error occurred.</h2>
          { this.state.error === 'USER_ALREADY_IN_SESSION' &&
            <div>
              <p>There is already someone called { this.props.user } in the session.</p>
              <p>Please <a href={`${window.location.pathname}/name`}>choose another name.</a></p>
            </div>
          }
          { this.state.error === 'SESSION_DOES_NOT_EXIST' &&
            <div>
              <p>This session does not exist.</p>
              <p>Why not <a href="/">create one?</a></p>
            </div>
          }
        </div>
      );
    }

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
