import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { post } from "axios";
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from "../shared/styles/forms";
import { API_URL } from '../../settings';
import { selectAuth } from '../../redux/selectors';
import { ADMIN } from '../../constants/roles';
import { signIn } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { ADMIN_LANDING } from '../../locations';
import SignInIcon from "@material-ui/icons/Person";

export default function AdminSignInPage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Retrieve session
  const auth = useSelector(selectAuth(ADMIN));

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
    dispatch(signIn(ADMIN, admin));
  };

  // Form submission fail handler
  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  // Form submit event handler
  const onSubmit = (credentials) => {
    setLoading(true);
    post(`${API_URL}api/v1/admin/sign-in`, credentials, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  // If there's a session redirect to the admin landing page
  if (!!auth) {
    return <Redirect to={ADMIN_LANDING()} />
  }

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
                  <SignInIcon style={{ marginBottom: '-0.12em' }} /> Iniciar Sesión
                </Typography>
                <Typography className={classes.noMarginTop} variant="caption">
                  Inicio de sesión para administradores
                </Typography>
                <form
                  className={classes.marginTop}
                  onSubmit={form.handleSubmit(onSubmit)}
                  autoComplete="off">

                  {/* Name field */}
                  <div>
                    <TextField
                      label="Nombre de usuario"
                      name="username"
                      inputRef={form.register({ required: "Debe insertar un nombre de usuario" })}
                      variant="outlined"
                      error={!!form.errors.username}
                      helperText={form.errors.username?.message}
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
        </Container>
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