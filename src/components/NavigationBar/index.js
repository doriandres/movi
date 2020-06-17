import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles";
import { List, ListItem, IconButton, Container } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";
import { Link } from 'react-router-dom';
import { ADMIN_SIGN_IN } from '../../locations';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavigationBar() {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(false);

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
          <List>
            <ListItem button component={Link} to={ADMIN_SIGN_IN()} color="inherit">Admin Iniciar Sesión</ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
