import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name, self, owner, request, handleRequest }) => (
  <div>
    { self || owner
        ? <button onClick={() => handleRequest(name)}>{ name }</button>
        : name
    }
    { request && ' request!' }
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired,
  owner: PropTypes.bool.isRequired,
  request: PropTypes.bool.isRequired,
  handleRequest: PropTypes.func.isRequired,
};

export default User;
