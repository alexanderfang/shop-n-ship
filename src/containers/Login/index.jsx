import React, { useState } from 'react';
import { TextField, Button, Typography }  from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { login } from '../../store/auth/actions';
import Loading from '../../components/Loading';
import Copyright from '../../components/Copyright';
  
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(8),
      backgroundColor: "#f4f4f4",
      borderRadius: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const isLoading = useSelector(state => state.authReducer.isLoading);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameTyped = (e) => {
        setUsername(e.target.value);
        setEmail(e.target.value+"@shopnship.com");
    }

    const handlePasswordTyped = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password, email));
    }

    const handleLogin = async googleData => {  
        // dispatch(login(googleData.profileObj.name, ))
        // console.log("googleData", googleData);
        // const data = await res.json()
        // store returned user somehow
    }

    return (
        isLoggedIn ? (
            <Redirect to="/"/>
        ) : (
            <>
                {isLoading ? (<Loading />) : null}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleUsernameTyped}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePasswordTyped}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <GoogleLogin
                                        clientId="414246971210-5ibga2hqsb9cckfmn072htg80p82c52d.apps.googleusercontent.com"
                                        buttonText="Log in with Google"
                                        onSuccess={handleLogin}
                                        onFailure={handleLogin}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                    </Container>
                </>
        )
    );
}
