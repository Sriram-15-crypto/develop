import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Jwt/AuthContext';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  CircularProgress,
  styled,
} from '@mui/material';

const UserProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'grey',
}));

function UserProfile() {
  const navigate = useNavigate();
  const { isAuthenticated, username, username1, email, dob, gender, fullname, createdby } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <UserProfileCard>
          <CardContent>
            <Typography variant="h4" style={{ textAlign: 'center', color: 'black' }}>
              User Profile
            </Typography>
            {(username || username1) && (
              <Typography>Username: {username || username1}</Typography>
            )}
            {email && <Typography variant="body1">Email: {email}</Typography>}
            {dob && <Typography variant="body1">Date of Birth: {dob}</Typography>}
            {gender && <Typography variant="body1">Gender: {gender}</Typography>}
            {fullname && <Typography variant="body1">Full Name: {fullname}</Typography>}
            {createdby && <Typography variant="body1">Created by: {createdby}</Typography>}
            {!username && !username1 && (
              <Typography variant="h6">Welcome to the User Profile Page</Typography>
            )}
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: '16px' }}
              component={Link}
              to="/dashboard"
            >
              Back
            </Button>
          </CardContent>
        </UserProfileCard>
      )}
    </Container>
  );
}

export default UserProfile;
