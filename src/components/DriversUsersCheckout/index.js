import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { post } from "axios";
import { Button, Paper, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from "../shared/styles/forms";
import { API_URL } from '../../settings';
import { selectAuth } from '../../redux/selectors';
import { DRIVER } from '../../constants/roles';
import { useHistory } from 'react-router-dom';
import { DRIVERS_LANDING } from '../../locations';

export default function DriversUsersCheckout() {
  const classes = useStyles();
  const history = useHistory();

  // Retrieve session
  const driverInfo = useSelector(selectAuth(DRIVER));

  // Form manager
  const form = useForm();

  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cleans any errors
  const cleanError = () => {
    setError(null);
  };

  const closeInfo = () => {
    setShowSuccess(false);
    history.push(DRIVERS_LANDING());
  };

  // Form submit event handler
  const onSubmit = ({ code }) => {
    setLoading(true);
    post(`${API_URL}api/v1/bills/checkout`, {
      customer: code,
      driver: driverInfo._id
    }, { withCredentials: true })
      .then(() => setShowSuccess(true))
      .catch(error => {
        setError(error.response?.data?.error || 'Hubo un error de conexión');
        setLoading(false);
      });
  };

  // Otherwise show the component
  return (
    <>
      <div className={classes.root}>

        {/* These grids are to center the component in medium and large screen size devices */}
        <Grid container>
          <Grid item xs={12} md={4} />
          <Grid item xs={12} md={4}>
            <Paper className={classes.padding}>
              {/* Form title */}
              <Typography className={classes.noMarginTop} variant="h5">
                Cobro
              </Typography>
              <Typography className={classes.noMarginTop} variant="h6">
                {driverInfo.route.code} - {driverInfo.route.name} - ₡{driverInfo.route.cost}
              </Typography>
              <form
                className={classes.marginTop}
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off">

                {/* Name field */}
                <div>
                  <TextField
                    label="Código del usuario"
                    name="code"
                    inputRef={form.register({ required: "Debe insertar un código" })}
                    variant="outlined"
                    error={!!form.errors.code}
                    helperText={form.errors.code?.message}
                    fullWidth
                  />
                </div>

                {/* Submit button */}
                <div className={classes.marginTop}>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth>
                    {loading ? "Verificando" : "Cobrar"}
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>

      {/* Error modal */}
      <Dialog open={!!error} onClose={cleanError} maxWidth="xs" fullWidth>
        <DialogTitle>Lo sentimos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Error message */}
            {error}
          </DialogContentText>
        </DialogContent>
        {/* Error actions */}
        <DialogActions>
          <Button onClick={cleanError} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Info modal */}
      <Dialog open={!!showSuccess} onClose={closeInfo} maxWidth="xs" fullWidth>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El cobro se ha procesado exitósamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeInfo} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}