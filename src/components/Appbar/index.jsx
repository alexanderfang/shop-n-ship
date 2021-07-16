import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Swal from 'sweetalert2';
import { FaShippingFast } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import routes from '../../configs/routes';
import { logout } from '../../store/auth/actions';
import { Link as MaterialLink } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
  }));

const SnSAppBar = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const classes = useStyles();
    // const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        Swal.fire({
            icon: 'info',
            title: 'Logged Out',
            text: 'You\'ve been logged out',
        })
    }

    return (
        <>
            <AppBar position="sticky" color="primary">
                <Toolbar>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography className={classes.title} variant="h6" noWrap style={{ display: "flex", alignItems: "center", fontWeight: "bold", color: "white" }}>
                            <FaShippingFast />
                            Shop n Ship
                        </Typography>
                    </Link>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {routes.map((route) => {
                            return route.shownOnAppbar 
                            ? <Link key={route.path} to={route.path}>
                                <Typography variant="h6" style={{ color:"white", fontWeight:"bold", marginLeft: 20, }}>
                                    <Badge badgeContent={0} color="secondary">
                                        {route.text}
                                    </Badge>
                                </Typography>
                            </Link>
                            : null
                        })}
                        {isLoggedIn 
                            ? (<>
                                <Link to="/admin" style={{ color:"white", fontWeight:"bold", }}>
                                    <Typography  variant="h6" style={{ color:"white", fontWeight:"bold", marginLeft: 20, }}>
                                        <Badge badgeContent={0} color="secondary">
                                            Admin
                                        </Badge>
                                    </Typography>
                                </Link>
                                <MaterialLink component="button" onClick={handleLogout} style={{ color:"white", fontWeight:"bold", }}>
                                    <Typography  variant="h6" style={{ color:"white", fontWeight:"bold", marginLeft: 20, }}>
                                        <Badge badgeContent={0} color="secondary">
                                            Logout
                                        </Badge>
                                    </Typography>
                                </MaterialLink>
                                </>)
                            : <Link to="/login">
                                    <Typography variant="h6" style={{ color:"white", fontWeight:"bold", marginLeft: 20, }}>
                                        <Badge badgeContent={0} color="secondary">
                                            Login
                                        </Badge>
                                    </Typography>
                                </Link>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            {props.children}
        </>
    );
}

export default SnSAppBar;