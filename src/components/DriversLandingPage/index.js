import React from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import IncomesIcon from "@material-ui/icons/InsertChart";
import RejectedIcon from "@material-ui/icons/Report";
import useStyles from "../shared/styles/forms";
import { DRIVERS_CHECKOUT, DRIVERS_INCOMES, DRIVERS_REJECTED } from '../../locations';
import { Link } from 'react-router-dom';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { DRIVER } from '../../constants/roles';

export default function DriverLandingPage() {
  const classes = useStyles();
  const driverInfo = useSelector(selectAuth(DRIVER));
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
                    <Typography className={classes.marginTop} variant="h5">
                      {driverInfo.name} {driverInfo.lastName}
                    </Typography>
                    <Typography className={classes.noMarginTop} variant="h6">
                      {driverInfo.route.code} - {driverInfo.route.name} - ₡{driverInfo.route.cost}
                    </Typography>
                    <Typography className={classes.marginTop} variant="subtitle1">
                      Bienvenido a la página para conductores de Movi
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
                        startIcon={<MoneyIcon />}
                        component={Link}
                        to={DRIVERS_CHECKOUT()}
                        fullWidth>
                        Cobro
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<IncomesIcon />}
                        component={Link}
                        to={DRIVERS_INCOMES()}
                        fullWidth>
                        Ingresos
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<RejectedIcon />}
                        component={Link}
                        to={DRIVERS_REJECTED()}
                        fullWidth>
                        Rechazos
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