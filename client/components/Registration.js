import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { EmojiNatureOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';

export default function Registration({ setShowRegister = () => {} }) {
  const { oktaAuth } = useOktaAuth();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedName = name.trim().split(' ');
    const [firstName, lastName] = [
      parsedName[0],
      parsedName[parsedName.length - 1],
    ];

    const res = await axios.post(
      '/api/auth/register',
      {
        firstName,
        lastName,
        login: email,
        email,
        password,
      },
      { withCredentials: true }
    );

    if (res.status === 201) {
      oktaAuth
        .signInWithCredentials({ username, password })
        .then((res) => {
          const sessionToken = res.sessionToken;
          setSessionToken(sessionToken);
          oktaAuth.signInWithRedirect({ sessionToken });
        })
        .catch((err) => console.log('Found an error', err));
    }

    console.log(res);
    // oktaAuth.setShowRegister(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="flex flex-center mt-6 text-lg">Welcome to Gutcheck</div>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EmojiNatureOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => setShowRegister(false)}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
