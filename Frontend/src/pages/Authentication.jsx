import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../contexts/AuthContext';


const defaultTheme = createTheme();

export default function Authentication() {

  const [userName, setuserName] = React.useState("");
  const [name, setname] = React.useState()
  const [password, setpassword] = React.useState()
  const [error, seterror] = React.useState()
  const [messages, setmessages] = React.useState()


  const [formState, setformState] = React.useState(0)

  const [open, setopen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(userName, password);
        console.log(result)
      }
      if (formState === 1) {
        let result = await handleRegister(name, userName, password);
        console.log(result);
        setuserName("");
        setmessages(result)
        setopen(true)
        seterror("")
        setformState(0)
        setpassword("")
      }
    } catch (err) {
      console.log(err)
      let message = (err.response.data.message);
      console.log(message, "im message")
      seterror(message);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: '100vh' }}
      >
        <CssBaseline />

        {/* Left Side Image */}
        <Grid
          size={{ xs: 0, sm: 4, md: 7 }}
          sx={{
            backgroundImage:
              'url("/background2.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right Side Form */}
        <Grid
          size={{ xs: 12, sm: 8, md: 5 }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: 'secondary.main',
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setformState(0) }}>Sign In</Button>
              <Button variant={formState === 1 ? "contained" : ""} onClick={() => {
                setformState(1)
              }} >Sign Up</Button>
            </div>

            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth();
              }}
              sx={{ mt: 1 }}
            >
              {formState == 1 ?
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Full Name"
                  label="Full Name"
                  name="Full Name"
                  value={name}
                  autoComplete="Full Name"
                  autoFocus
                  onChange={(e) => { setname(e.target.value) }}
                /> : null}


              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                value={userName}
                autoComplete="username"
                autoFocus
                onChange={(e) => { setuserName(e.target.value) }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => { setpassword(e.target.value) }}
              />

              <p style={{ color: "red" }}>{error}</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState == 0 ? "Sign In" : "Sign Up"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={messages}
      />
    </ThemeProvider>
  );
}