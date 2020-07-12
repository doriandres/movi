/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { get } from "axios";
import { Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from "../shared/styles/forms";
import { API_URL } from '../../settings';
import { selectAuth } from '../../redux/selectors';
import { CUSTOMER } from '../../constants/roles';
import BalanceIcon from "@material-ui/icons/AccountBalanceWallet";
import Loading from '../Loading';
import Alert from '@material-ui/lab/Alert';

export default function CustomerMyBalancePage() {
  const classes = useStyles();
  const customerInfo = useSelector(selectAuth(CUSTOMER));

  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBalance = () => {
    setLoading(true);
    get(`${API_URL}api/v1/customers/balance/${customerInfo._id}`, { withCredentials: true })
      .then((response) => setBalance(response.data.result))
      .catch(err => setError(err.response?.data?.error || 'Hubo un error de conexión al cargar el balance'))
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    loadBalance();
  }, []);

  // Otherwise show the component
  return (
    <>
      <div className={classes.root}>
        <Container>
          {/* These grids are to center the component in medium and large screen size devices */}
          <Grid container>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={4}>
              <Paper className={classes.padding}>
                {/* Form title */}
                <Typography className={classes.noMarginTop} variant="h5">
                  <BalanceIcon style={{ marginBottom: '-0.12em' }} /> Balance
                </Typography>

                <br />
                {/* If loading display loading spinner */}
                {loading && <Loading />}

                {/* If there's a loadError display an alert message */}
                {error && <Alert severity="error">{error}</Alert>}

                {!loading && !error && (
                  <div className={classes.center}>
                    <Typography variant="h6">
                      ₡ {new Intl.NumberFormat('en-US', { style: 'decimal' }).format(balance)}
                    </Typography>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

    </>
  );
}