import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupList from '../Signup/SignupList';
import { useAuth } from '../Jwt/AuthContext';
import UserProfile from './UserProfile';
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import backgroundImage from "../images/d.jpg"

const useStyles = {
  adminContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("your-background-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center',
    backgroundImage: `url(${backgroundImage})`,
  },
  content: {
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeText: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};

function AdminPage() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, username, username1 } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={useStyles.adminContainer}>
      <Container maxWidth="sm">
        <Box style={useStyles.content}>
          {loading ? (
            <div style={useStyles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {(username || username1) && (
                <Typography variant="h4" style={useStyles.welcomeText}>
                  Welcome {username || (username1 || 'Loading...')} {/* Check for username1 */}
                </Typography>
              )}
              {!username && !username1 && (
                <Typography variant="h4" style={useStyles.welcomeText}>
                </Typography>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" style={{ ...useStyles.button, marginRight: '18px' }} onClick={handleLogout}>
                  Logout
                </Button>
                <Link to="/AddUser">
                  <Button variant="contained" color="primary" style={{ ...useStyles.button, marginRight: '18px' }}>
                    Add User
                  </Button>
                </Link>
                <Link to="/Profile" style={{ ...useStyles.button, marginRight: '18px' }}>
                  <Button>
                    Profile
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Box>
      </Container>
      <SignupList />
    </div>
  );
}

export default AdminPage;
