import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import { List, ListItem, IconButton, Container, Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";
import { Link } from 'react-router-dom';
import { ADMIN_SIGN_IN, ADMIN_DRIVERS, ADMIN_LANDING, ADMIN_ROUTES, ADMIN_USERS } from '../../locations';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { ADMIN } from '../../constants/roles';
import { signOut } from '../../redux/actions';
import { post } from 'axios';
import { API_URL } from '../../settings';


export default function NavigationBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminAuth = useSelector(selectAuth(ADMIN));

  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isAdminSigningOut, setIsAdminSigningOut] = useState(false);

  const cleanError = () => setError(null);

  const onSignOutClick = (event) => {
    event.stopPropagation();
    setIsAdminSigningOut(true);
    post(`${API_URL}api/v1/admin/sign-out`, null, { withCredentials: true })
      .then(() => {
        dispatch(signOut([ADMIN]));
        setShowMenu(false);
      })
      .catch(error => setError(error.response?.data?.error || 'Hubo un error de conexión'))
      .finally(() => setIsAdminSigningOut(false));
  };

  return (
    <>
      <div className={clsx(classes.grow, classes.marginBottom)}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton onClick={() => setShowMenu(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h5">
              <MoviIcon /> Movi
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
        <div className={classes.menu} onClick={() => setShowMenu(false)}>
          <Container>
            <Typography className={clsx(classes.title, classes.titleMenu)} variant="h5">
              <MoviIcon /> Movi
            </Typography>
          </Container>
          <List
            subheader={
              <ListSubheader component="div">
                Administración
              </ListSubheader>
            }
          >
            {!adminAuth ?
              <ListItem button component={Link} to={ADMIN_SIGN_IN()} color="inherit">Iniciar Sesión</ListItem>
              :
              <>
                <ListItem button component={Link} to={ADMIN_LANDING()} color="inherit">Inicio</ListItem>
                <ListItem button component={Link} to={ADMIN_DRIVERS()} color="inherit">Conductores</ListItem>
                <ListItem button component={Link} to={ADMIN_ROUTES()} color="inherit">Rutas</ListItem>
                <ListItem button component={Link} to={ADMIN_USERS()} color="inherit">Usuarios</ListItem>
                <ListItem button onClick={onSignOutClick} disabled={isAdminSigningOut} color="inherit">Cerrar Sesión</ListItem>
              </>
            }
          </List>
        </div>
      </Drawer>

      <Dialog open={!!error} onClose={cleanError} maxWidth="xs" fullWidth>
        <DialogTitle>Lo sentimos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cleanError} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
