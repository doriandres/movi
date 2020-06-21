import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import useStyles from "../shared/styles/forms";
import { API_URL } from '../../settings';
import { Redirect } from 'react-router-dom';
import {MDCRipple} from '@material/ripple';

export default function AdminLandingPage() {

  const classes = useStyles();
  const form = useForm();

  return (
  <>
    <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} md={8} />
          <Grid item lg={12} md={8}>
            <Paper className={classes.padding}>
              <Typography className={classes.noMarginTop} variant="h1">
              Movi - Monedero Digital
              </Typography>
              <Typography className={classes.marginTop} variant="subtitle1">
              Bienvenido a la página administrativa de Movi
              </Typography>
              <Grid container>
              <Grid item md={12} md={8} className={classes.marginTop}>
            <Paper className={classes.padding}>
              <Typography className={classes.marginTop} variant="h5">
              Opciones
              </Typography>
              <form
                className={classes.marginTop}
                autoComplete="off">               
                <div className={classes.marginTop}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth>
                    <span>Conductores</span>
                  </Button>
                </div>
                <div className={classes.marginTop}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth>
                    <span>Rutas</span>
                  </Button>
                </div>
                <div className={classes.marginTop}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth>
                    <span>Usuarios</span>
                  </Button>
                </div>
              </form>
              </Paper>
              </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
</>
  );
}