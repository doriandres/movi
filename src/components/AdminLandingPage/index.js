import React from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import BusIcon from "@material-ui/icons/DirectionsBus";
import RouteIcon from "@material-ui/icons/Directions";
import UserIcon from "@material-ui/icons/SupervisorAccount";
import useStyles from "../shared/styles/forms";
import { ADMIN_ROUTES, ADMIN_DRIVERS, ADMIN_USERS } from '../../locations';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function AdminLandingPage() {

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container>
          <div className={classes.root}>
            <Grid container>
              <Grid item lg={12} md={8} />
              <Grid item lg={12} md={8}>
                <Paper className={classes.padding}>
                  <Typography className={classes.noMarginTop} variant="h4">
                    Movi - Monedero Digital
                    </Typography>
                  <Typography className={classes.marginTop} variant="subtitle1">
                    Bienvenido a la página administrativa de Movi
                  </Typography>
                  <div className={clsx(classes.padding, classes.flex)}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<BusIcon />}
                      component={Link}
                      to={ADMIN_DRIVERS()}>
                      Conductores
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<RouteIcon />}
                      component={Link} to={ADMIN_ROUTES()}>
                      Rutas
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<UserIcon />}
                      component={Link} to={ADMIN_USERS()}>
                      Usuarios
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}