import React from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import BusIcon from "@material-ui/icons/DirectionsBus";
import RouteIcon from "@material-ui/icons/Directions";
import UserIcon from "@material-ui/icons/SupervisorAccount";
import useStyles from "../shared/styles/forms";
import { ADMIN_ROUTES, ADMIN_DRIVERS, ADMIN_USERS } from '../../locations';
import { Link } from 'react-router-dom';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";

export default function AdminLandingPage() {

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container>
          <div className={classes.root}>
            <Grid container>
              <Grid item sm={12} md={2} />
              <Grid item sm={12} md={8}>
                <Paper className={classes.padding}>
                  <div className={classes.center}>
                    <Typography className={classes.noMarginTop} variant="h4">
                      <MoviIcon />Movi - Monedero Digital
                    </Typography>
                    <Typography className={classes.marginTop} variant="subtitle1">
                      Bienvenido a la página administrativa de Movi
                    </Typography>
                  </div>
                  <br />
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={4} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<BusIcon />}
                        component={Link}
                        to={ADMIN_DRIVERS()}
                        fullWidth>
                        Conductores
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<RouteIcon />}
                        component={Link} to={ADMIN_ROUTES()}
                        fullWidth>
                        Rutas
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<UserIcon />}
                        component={Link} to={ADMIN_USERS()}
                        fullWidth>
                        Usuarios
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}