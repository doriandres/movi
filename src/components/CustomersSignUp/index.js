import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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
import { CUSTOMER } from '../../constants/roles';
import { signIn } from '../../redux/actions';
import Link from '@material-ui/core/Link';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { CUSTOMERS_LANDING, CUSTOMERS_SIGN_IN } from '../../locations';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';

export default function CustomersSignInPage() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Retrieve session
  const auth = useSelector(selectAuth(CUSTOMER));

  // Form manager
  const form = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cleans any errors
  const cleanError = () => {
    setError(null);
  };

  // Form submission success handler
  const onSuccess = (customer) => {
    dispatch(signIn(CUSTOMER, customer));
  };

  // Form submission fail handler
  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  // Form submit event handler
  const onSubmit = (credentials) => {
    setLoading(true);
    post(`${API_URL}api/v1/customers/sign-up`, credentials, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  // If there's a session redirect to the admin landing page
  if (!!auth) {
    return <Redirect to={CUSTOMERS_LANDING()} />
  }

  // Otherwise show the component
  return (
    <>
      <div className={classes.root}>

        {/* These grids are to center the component in medium and large screen size devices */}
        <Grid container>
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={6}>
            <Paper className={classes.padding}>
              {/* Form title */}
              <Typography className={classes.noMarginTop} variant="h5">
                Clientes | Registro
              </Typography>
              <form
                className={classes.marginTop}
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off">

                {/* Email field */}
                <div>
                  <TextField
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="new-email"
                    inputRef={form.register({
                      required: "Debe insertar un correo electrónico",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Debe insertar un correo electrónico válido"
                      }
                    })}
                    variant="outlined"
                    error={!!form.errors.email}
                    helperText={form.errors.email?.message}
                    fullWidth
                  />
                </div>

                {/* Password field */}
                <div className={classes.marginTop}>
                  <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    inputRef={form.register({ required: "Debe insertar una contraseña" })}
                    variant="outlined"
                    error={!!form.errors.password}
                    helperText={form.errors.password?.message}
                    fullWidth
                  />
                </div>

                {/* Name field */}
                <div className={classes.marginTop}>
                  <TextField
                    label="Nombre"
                    name="name"
                    inputRef={form.register({ required: "Debe insertar un nombre" })}
                    variant="outlined"
                    error={!!form.errors.name}
                    helperText={form.errors.name?.message}
                    fullWidth
                  />
                </div>

                {/* Last name field */}
                <div className={classes.marginTop}>
                  <TextField
                    label="Apellido"
                    name="lastName"
                    inputRef={form.register({ required: "Debe insertar un apellido" })}
                    variant="outlined"
                    error={!!form.errors.lastName}
                    helperText={form.errors.lastName?.message}
                    fullWidth
                  />
                </div>

                <div className={classes.marginTop}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                    <Controller
                      name="bornDate"
                      control={form.control}
                      as={
                        <DatePicker
                          inputVariant="outlined"
                          okLabel="Listo"
                          cancelLabel="Cancelar"
                          format="dd/MM/yyyy"
                          margin="normal"
                          label="Fecha de Nacimiento"
                          invalidDateMessage="Fecha inválida"
                          animateYearScrolling
                          maxDate={new Date()}
                          fullWidth
                        />
                      }
                    />
                  </MuiPickersUtilsProvider>
                </div>


                <div className={classes.marginTop}>
                  <TextField
                    label="Número de tarjeta"
                    name="cardNumber"
                    type="tel"
                    inputRef={form.register({
                      required: "Debe insertar un número de tarjeta",
                      pattern: {
                        value: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i,
                        message: "Debe insertar un número de tarjeta válido"
                      }
                    })}
                    variant="outlined"
                    error={!!form.errors.cardNumber}
                    helperText={form.errors.cardNumber?.message}
                    fullWidth
                  />
                </div>

                <div className={classes.marginTop}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="month-label" error={!!form.errors.expirationMonth}>
                      Mes de vencimiento
                    </InputLabel>
                    <Controller
                      name="expirationMonth"
                      rules={{ required: "Debe seleccionar un mes de vencimiento" }}
                      control={form.control}
                      as={
                        <Select labelId="month-label" label="Mes de vencimiento" error={!!form.errors.expirationMonth}>
                          {Array(12).fill().map((_, index) => <MenuItem value={index + 1}>{index + 1 < 10 && "0"}{index + 1}</MenuItem>)}
                        </Select>
                      } />
                    <FormHelperText error={!!form.errors.expirationMonth}>
                      {form.errors.expirationMonth?.message}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className={classes.marginTop}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="year-label" error={!!form.errors.expirationYear}>
                      Año de vencimiento
                    </InputLabel>
                    <Controller
                      name="expirationYear"
                      rules={{ required: "Debe seleccionar un año de vencimiento" }}
                      control={form.control}
                      as={
                        <Select labelId="year-label" label="Año de vencimiento" error={!!form.errors.expirationYear}>
                          <MenuItem value="2021">2021</MenuItem>
                          <MenuItem value="2022">2022</MenuItem>
                          <MenuItem value="2023">2023</MenuItem>
                          <MenuItem value="2024">2024</MenuItem>
                          <MenuItem value="2025">2025</MenuItem>
                        </Select>
                      } />
                    <FormHelperText error={!!form.errors.expirationYear}>
                      {form.errors.expirationYear?.message}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className={classes.marginTop}>
                  <TextField
                    label="CSV"
                    name="cardCsv"
                    type="tel"
                    inputRef={form.register({
                      required: "Debe insertar un csv",
                      pattern: {
                        value: /^[0-9]{3}$/i,
                        message: "Debe insertar un csv de 3 dīgitos"
                      }
                    })}
                    variant="outlined"
                    error={!!form.errors.cardCsv}
                    helperText={form.errors.cardCsv?.message}
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
                    {loading ? "Verificando" : "Registrar"}
                  </Button>
                </div>
                <div className={clsx(classes.marginTop, classes.center)}>
                  <Typography variant="body1">
                    ¿Ya tiene una cuenta? <Link component={RouterLink} to={CUSTOMERS_SIGN_IN()}>Iniciar Sesión</Link>
                  </Typography>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <br />
        <br />
        <br />
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