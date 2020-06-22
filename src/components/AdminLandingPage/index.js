import React from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from "../shared/styles/forms";
import { ADMIN_ROUTES, ADMIN_DRIVERS } from '../../locations';
import { Link } from 'react-router-dom';

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
                  <Typography className={classes.noMarginTop} variant="h1">
                    Movi - Monedero Digital
              </Typography>
                  <Typography className={classes.marginTop} variant="subtitle1">
                    Bienvenido a la página administrativa de Movi
              </Typography>
                </Paper>



                <Grid container>
                  <Grid item lg={12} md={8} className={classes.marginTop}>
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
                            fullWidth
                            component={Link} to={ADMIN_DRIVERS()}>Conductores
                  </Button>
                        </div>
                        <div className={classes.marginTop}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            component={Link} to={ADMIN_ROUTES()}>Rutas
                  </Button>
                        </div>
                        <div className={classes.marginTop}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            component={Link} to={ADMIN_ROUTES()}>Usuarios
                  </Button>
                        </div>
                      </form>
                    </Paper>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </div>
          </Container>
    </div>
</>
  );
}