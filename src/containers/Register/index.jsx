import React, { useState } from 'react';
import { TextField, Button, Typography }  from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { useStyles } from './style';
import Copyright from '../../components/Copyright';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import handleError from '../../helpers/handleError';
import { register } from '../../store/auth/actions';

export default function Register() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const isLoading = useSelector(state => state.authReducer.isLoading);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameTyped = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailTyped = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordTyped = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordTyped = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            handleError({response: {data: {error_message: "Password and Confirm Password did not match"}}});
        }else{
            dispatch(register(username, password, email));
            history.push('/login');
        }
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
                        Register
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
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleEmailTyped}
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
                        onChange={handlePasswordTyped}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        onChange={handleConfirmPasswordTyped}
                        error={password !== confirmPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
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
