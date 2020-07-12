import React from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import BalanceIcon from "@material-ui/icons/AccountBalanceWallet";
import DepositIcon from "@material-ui/icons/Payment";
import ExpensesIcon from "@material-ui/icons/InsertChartOutlined";
import TripsIcon from "@material-ui/icons/AirportShuttle";
import useStyles from "../shared/styles/forms";
import { CUSTOMERS_BALANCE, CUSTOMERS_DEPOSIT, CUSTOMERS_EXPENSES, CUSTOMERS_TRIPS } from '../../locations';
import { Link } from 'react-router-dom';
import MoviIcon from "@material-ui/icons/DirectionsBusOutlined";
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { CUSTOMER } from '../../constants/roles';

export default function CustomerLandingPage() {
  const classes = useStyles();
  const customerInfo = useSelector(selectAuth(CUSTOMER));
  return (
    <>
      <div className={classes.root}>
        <Container>
          <div className={classes.root}>
            <Grid container>
              <Grid item sm={12} md={2} />
              <Grid item sm={12} md={8}>
                <Paper className={classes.padding}>
                  <Typography className={classes.noMarginTop} variant="h4">
                    <MoviIcon />Movi - Monedero Digital
                  </Typography>
                  <Typography className={classes.marginTop} variant="h5">
                    <b>{customerInfo.code}</b> - {customerInfo.name} {customerInfo.lastName}
                  </Typography>
                  <Typography className={classes.marginTop} variant="subtitle1">
                    Bienvenido a la página de clientes de Movi
                  </Typography>
                  <br />
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={6} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<BalanceIcon />}
                        component={Link}
                        to={CUSTOMERS_BALANCE()}
                        fullWidth>
                        Balance
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<DepositIcon />}
                        component={Link}
                        to={CUSTOMERS_DEPOSIT()}
                        fullWidth>
                        Depositar
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<ExpensesIcon />}
                        component={Link}
                        to={CUSTOMERS_EXPENSES()}
                        fullWidth>
                        Gastos
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<TripsIcon />}
                        component={Link}
                        to={CUSTOMERS_TRIPS()}
                        fullWidth>
                        Viajes
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