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
import { ADMIN } from '../../constants/roles';
import { signIn } from '../../redux/actions';
import { Redirect } from 'react-router-dom';
import { ADMIN_LANDING } from '../../locations';

export default function AdminSignInPage() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth(ADMIN));
  const classes = useStyles();
  const form = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cleanError = () => {
    setError(null);
  };

  const onSuccess = (admin) => {
    dispatch(signIn(ADMIN, admin));
  };

  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  const onSubmit = (credentials) => {
    setLoading(true);
    post(`${API_URL}api/v1/admin/sign-in`, credentials, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };


  if (!!auth) {
    return <Redirect to={ADMIN_LANDING()} />
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={4} />
          <Grid item xs={12} md={4}>
            <Paper className={classes.padding}>
              <Typography className={classes.noMarginTop} variant="h5">
                Adminstración | Iniciar Sesión
              </Typography>
              <form
                className={classes.marginTop}
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off">
                <div>
                  <TextField
                    label="Nombre de usuario"
                    name="username"
                    inputRef={form.register({ required: "Debe insertar un correo electrónico" })}
                    variant="outlined"
                    error={!!form.errors.username}
                    helperText={form.errors.username?.message}
                    fullWidth
                  />
                </div>
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
      <Dialog open={!!error} onClose={cleanError} maxWidth="xs" fullWidth>
        <DialogTitle>Lo sentimos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cleanError} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}