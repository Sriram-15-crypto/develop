import React, { useState } from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import BackgroundImage from '../images/c.jpg'; // Replace with actual path
import styled from 'styled-components'; // Import styled from styled-components

import SignIn from '../Signup/Signin';
import Popup from './Popup';
import AdminLoginForm from '../Signup/Signin';
import Signup from '../Signup/Signup';

// Styled components for styling
const RootContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled(Container)`
  && {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 16px; 
    border-radius: 8px; 
    text-align: center;
  }
`;

const AuthComponents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <RootContainer>
      <CssBaseline />
      <ContentContainer maxWidth="xs">
        <div className="auth-components">
          <div className="signin-form">
            <SignIn />
          </div>
          <div className="signup-button">
            <Button onClick={openSignInModal}  style={{right:"41%" }}>
              Sign Up
            </Button>
          </div>
          <div className="login-form">
            {/* Render your login component here */}
          </div>
        </div>
      </ContentContainer>

      {/* Render the popup */}
      {isSignInModalOpen && (
        <Popup title="Sign In" onClose={closeSignInModal}>
          <Signup />
        </Popup>
      )}
    </RootContainer>
  );
};

export default Home;
