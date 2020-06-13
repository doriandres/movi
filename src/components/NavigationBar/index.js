import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import { Button, List, ListItem, IconButton } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";
import { Link } from 'react-router-dom';
import { HOME_PAGE, ADMIN_SIGN_IN, SIGN_IN } from '../../locations';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavigationBar() {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(false);


  return (
    <>
      <div className={clsx(classes.grow, classes.marginBottom)}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={() => setShowMenu(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h5">
              <MoviIcon /> Movi
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button component={Link} to={HOME_PAGE()} color="inherit">Inicio</Button>
              <Button component={Link} to={SIGN_IN()} color="inherit">Iniciar Sesión</Button>
              <Button component={Link} to={ADMIN_SIGN_IN()} color="inherit">Admin Iniciar Sesión</Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
        <div className={classes.menu} onClick={() => setShowMenu(false)}>
          <List>
            <ListItem button component={Link} to={HOME_PAGE()} color="inherit">Inicio</ListItem>
            <ListItem button component={Link} to={SIGN_IN()} color="inherit">Iniciar Sesión</ListItem>
            <ListItem button component={Link} to={ADMIN_SIGN_IN()} color="inherit">Admin Iniciar Sesión</ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
