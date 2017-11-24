import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledName = styled.div`
`;

const Name = ({ user, handleChangeUser, history }) => (
  <StyledName>
    <h2>What is your name?</h2>
    <form>
      <input
        type="text"
        id="name"
        placeholder="What is your name?"
        value={user}
        onChange={(e) => { e.preventDefault(); handleChangeUser(e.target.value); }}
        required
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          const isValid = e.target.parentElement.querySelector('input#name').checkValidity();
          if (isValid) {
            const split = window.location.pathname.split('/');
            const url = split
              .splice(0, split.length - 1)
              .join('/');
            history.push(url);
          }
        }}
      >
        Join Session
      </button>
    </form>
  </StyledName>
);

Name.propTypes = {
  user: PropTypes.string.isRequired,
  handleChangeUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Name;
