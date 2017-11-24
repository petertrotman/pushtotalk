import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import theme from './theme';

const flash = keyframes`
  0,50% {
    color: inherit;
  }

  51%, 100% {
    color: ${theme.colours.warning};
  }
`;

const StyledUser = styled.div`
  margin: 0.2em 0;

  span, button {
    all: unset;
    font-size: 2em;
    ${props => props.request && `
    text-shadow: 0px 0px 2px ${theme.colours.text};
    font-weight: 800;
    animation: ${flash} 0.2s linear 3 forwards;
    `}
  }

  button {
    cursor: pointer;
    :hover {
      color: ${theme.colours.lighttext};
    }
  }

  span {
  }
`;

const User = ({
  name, self, owner, request, handleRequest,
}) => (
  <StyledUser self={self} owner={owner} request={request}>
    { self || owner
        ? <button onClick={() => handleRequest(name)}>{ name }</button>
        : <span>{ name }</span>
    }
  </StyledUser>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired,
  owner: PropTypes.bool.isRequired,
  request: PropTypes.bool.isRequired,
  handleRequest: PropTypes.func.isRequired,
};

export default User;
