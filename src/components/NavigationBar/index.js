import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import { List, ListItem, IconButton, Container, Button, ListItemIcon, ListItemText } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";
import { Link } from 'react-router-dom';
import { ADMIN_SIGN_IN, ADMIN_DRIVERS, ADMIN_LANDING, ADMIN_ROUTES, ADMIN_USERS, DRIVERS_LANDING, DRIVERS_SIGN_IN, DRIVERS_CHECKOUT, DRIVERS_INCOMES, DRIVERS_REJECTED, CUSTOMERS_SIGN_IN, CUSTOMERS_LANDING, CUSTOMERS_SIGN_UP, CUSTOMERS_BALANCE, CUSTOMERS_DEPOSIT, CUSTOMERS_EXPENSES, CUSTOMERS_TRIPS, ADMIN_INACTIVE_USERS } from '../../locations';
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
import { ADMIN, DRIVER, CUSTOMER } from '../../constants/roles';
import { signOut } from '../../redux/actions';
import { post } from 'axios';
import { API_URL } from '../../settings';
import HomeIcon from "@material-ui/icons/Home"
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import IncomesIcon from "@material-ui/icons/InsertChart";
import RejectedIcon from "@material-ui/icons/Report";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import SignInIcon from "@material-ui/icons/Person";
import BusIcon from "@material-ui/icons/DirectionsBus";
import RouteIcon from "@material-ui/icons/Directions";
import UserIcon from "@material-ui/icons/SupervisorAccount";
import RejectedUserIcon from "@material-ui/icons/Block";
import SignUpIcon from "@material-ui/icons/PersonAdd";
import BalanceIcon from "@material-ui/icons/AccountBalanceWallet";
import DepositIcon from "@material-ui/icons/Payment";
import ExpensesIcon from "@material-ui/icons/InsertChartOutlined";
import TripsIcon from "@material-ui/icons/AirportShuttle";

export default function NavigationBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customerAuth = useSelector(selectAuth(CUSTOMER));
  const adminAuth = useSelector(selectAuth(ADMIN));
  const driverAuth = useSelector(selectAuth(DRIVER));

  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isCustomerSigningOut, setIsCustomerSigningOut] = useState(false);
  const [isAdminSigningOut, setIsAdminSigningOut] = useState(false);
  const [isDriverSigningOut, setIsDriverSigningOut] = useState(false);

  const cleanError = () => setError(null);

  const onCustomerSignOutClick = (event) => {
    event.stopPropagation();
    setIsCustomerSigningOut(true);
    post(`${API_URL}api/v1/customers/sign-out`, null, { withCredentials: true })
      .then(() => {
        dispatch(signOut([CUSTOMER]));
        setShowMenu(false);
      })
      .catch(error => setError(error.response?.data?.error || 'Hubo un error de conexión'))
      .finally(() => setIsCustomerSigningOut(false));
  };

  const onAdminSignOutClick = (event) => {
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

  const onDriverSignOutClick = (event) => {
    event.stopPropagation();
    setIsDriverSigningOut(true);
    post(`${API_URL}api/v1/bus-drivers/sign-out`, null, { withCredentials: true })
      .then(() => {
        dispatch(signOut([DRIVER]));
        setShowMenu(false);
      })
      .catch(error => setError(error.response?.data?.error || 'Hubo un error de conexión'))
      .finally(() => setIsDriverSigningOut(false));
  };

  return (
    <>
      <div className={clsx(classes.grow, classes.marginBottom)}>
        <AppBar position="static">
          <Toolbar className={classes.bar} variant="dense">
            <IconButton onClick={() => setShowMenu(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h5">
              <MoviIcon /> Movi
            </Typography>
            <div />
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
                Clientes
              </ListSubheader>
            }
          >
            {!customerAuth ?
              <>
                <ListItem button component={Link} to={CUSTOMERS_SIGN_IN()} color="inherit">
                  <ListItemIcon>
                    <SignInIcon />
                  </ListItemIcon>
                  <ListItemText primary="Iniciar Sesión" />
                </ListItem>
                <ListItem button component={Link} to={CUSTOMERS_SIGN_UP()} color="inherit">
                  <ListItemIcon>
                    <SignUpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Registrar cuenta" />
                </ListItem>
              </>
              :
              <>
                <ListItem button component={Link} to={CUSTOMERS_LANDING()} color="inherit">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItem>

                <ListItem button component={Link} to={CUSTOMERS_BALANCE()} color="inherit">
                  <ListItemIcon>
                    <BalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Balance" />
                </ListItem>

                <ListItem button component={Link} to={CUSTOMERS_DEPOSIT()} color="inherit">
                  <ListItemIcon>
                    <DepositIcon />
                  </ListItemIcon>
                  <ListItemText primary="Depositar" />
                </ListItem>

                <ListItem button component={Link} to={CUSTOMERS_EXPENSES()} color="inherit">
                  <ListItemIcon>
                    <ExpensesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gastos" />
                </ListItem>

                <ListItem button component={Link} to={CUSTOMERS_TRIPS()} color="inherit">
                  <ListItemIcon>
                    <TripsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Viajes" />
                </ListItem>

                <ListItem button onClick={onCustomerSignOutClick} disabled={isCustomerSigningOut} color="inherit">
                  <ListItemIcon>
                    <SignOutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar Sesión" />
                </ListItem>
              </>
            }
          </List>

          <List
            subheader={
              <ListSubheader component="div">
                Administración
              </ListSubheader>
            }
          >
            {!adminAuth ?
              <ListItem button component={Link} to={ADMIN_SIGN_IN()} color="inherit">
                <ListItemIcon>
                  <SignInIcon />
                </ListItemIcon>
                <ListItemText primary="Iniciar Sesión" />
              </ListItem>
              :
              <>
                <ListItem button component={Link} to={ADMIN_LANDING()} color="inherit">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem button component={Link} to={ADMIN_DRIVERS()} color="inherit">
                  <ListItemIcon>
                    <BusIcon />
                  </ListItemIcon>
                  <ListItemText primary="Conductores" />
                </ListItem>
                <ListItem button component={Link} to={ADMIN_ROUTES()} color="inherit">
                  <ListItemIcon>
                    <RouteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Rutas" />
                </ListItem>
                <ListItem button component={Link} to={ADMIN_USERS()} color="inherit">
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuarios" />
                </ListItem>
                <ListItem button component={Link} to={ADMIN_INACTIVE_USERS()} color="inherit">
                  <ListItemIcon>
                    <RejectedUserIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuarios Deshabilitados" />
                </ListItem>
                <ListItem button onClick={onAdminSignOutClick} disabled={isAdminSigningOut} color="inherit">
                  <ListItemIcon>
                    <SignOutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar Sesión" />
                </ListItem>
              </>
            }
          </List>

          <List
            subheader={
              <ListSubheader component="div">
                Conductores
              </ListSubheader>
            }
          >
            {!driverAuth ?
              <ListItem button component={Link} to={DRIVERS_SIGN_IN()} color="inherit">
                <ListItemIcon>
                  <SignInIcon />
                </ListItemIcon>
                <ListItemText primary="Iniciar Sesión" />
              </ListItem>
              :
              <>
                <ListItem button component={Link} to={DRIVERS_LANDING()} color="inherit">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem button component={Link} to={DRIVERS_CHECKOUT()} color="inherit">
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cobro" />
                </ListItem>
                <ListItem button component={Link} to={DRIVERS_INCOMES()} color="inherit">
                  <ListItemIcon>
                    <IncomesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ingresos" />
                </ListItem>
                <ListItem button component={Link} to={DRIVERS_REJECTED()} color="inherit">
                  <ListItemIcon>
                    <RejectedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Rechazos" />
                </ListItem>
                <ListItem button onClick={onDriverSignOutClick} disabled={isDriverSigningOut} color="inherit">
                  <ListItemIcon>
                    <SignOutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar Sesión" />
                </ListItem>
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
