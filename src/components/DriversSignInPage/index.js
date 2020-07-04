import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { signIn } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { DRIVERS_LANDING } from '../../locations';

export default function DriverSignInPage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Retrieve session
  const auth = useSelector(selectAuth(DRIVER));

  // Form manager
  const form = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cleans any errors
  const cleanError = () => {
    setError(null);
  };

  // Form submission success handler
  const onSuccess = (admin) => {
    dispatch(signIn(DRIVER, admin));
  };

  // Form submission fail handler
  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  // Form submit event handler
  const onSubmit = (credentials) => {
    setLoading(true);
    post(`${API_URL}api/v1/bus-drivers/sign-in`, credentials, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  // If there's a session redirect to the admin landing page
  if (!!auth) {
    return <Redirect to={DRIVERS_LANDING()} />
  }

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
                Conductores | Iniciar Sesión
              </Typography>
              <form
                className={classes.marginTop}
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off">

                {/* Name field */}
                <div>
                  <TextField
                    label="Cédula"
                    name="citizenId"
                    autoComplete="cedula"
                    inputRef={form.register({
                      required: "Debe insertar una cédula",
                      validate(val) {
                        const number = parseFloat(val);
                        if (
                          isNaN(val) ||  // must be a number
                          number <= 0 || // can't be 0 or negativa
                          number % 1 !== 0 || // can't have decimals
                          String(number).length < 9 || // can't have less than 9 chars
                          String(number).length > 11 // can't have more than 11 chars                      
                        ) {
                          return "Debe insertar una cédula válida";
                        }
                      }
                    })}
                    variant="outlined"
                    error={!!form.errors.citizenId}
                    helperText={form.errors.citizenId?.message}
                    fullWidth
                  />
                </div>

                {/* Password field */}
                <div className={classes.marginTop}>
                  <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    inputRef={form.register({ required: "Debe insertar una contraseña" })}
                    variant="outlined"
                    error={!!form.errors.password}
                    helperText={form.errors.password?.message}
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
                    {loading ? "Verificando" : "Iniciar Sesión"}
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
    </>
  );
}