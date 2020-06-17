import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useForm, Controller } from 'react-hook-form';
import { post } from "axios";
import { useMediaQuery, useTheme } from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";
import useStyles from "./../../shared/styles/forms";
import { API_URL } from '../../../settings';
import RoutesSelect from '../../shared/components/RoutesSelect';

export default function RegisterDriverModal({ open, onClose = () => { }, onCreated = () => { } }) {
  const classes = useStyles();
  const form = useForm({
    defaultValues: {
      citizenId: "",
      password: "",
      name: "",
      lastName: "",
      route: ""
    }
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cleanError = () => {
    setError(null);
  };

  const onSuccess = () => {
    onCreated();
    onClose();
    form.reset();
    setLoading(false);
  };

  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    post(`${API_URL}api/v1/bus-drivers/insert`, data, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  return (
    <>
      <Dialog open={!!open} maxWidth="sm" fullWidth scroll="paper" fullScreen={fullScreen}>
        <DialogTitle>Registrar Conductor</DialogTitle>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off">
          <DialogContent>
            <div>
              <TextField
                label="Cédula"
                name="citizenId"
                autoComplete="new-cedula"
                inputRef={form.register({
                  required: "Debe insertar una cédula",
                  validate(val) {
                    const number = parseFloat(val);
                    if (
                      Number.isNaN(number) ||  // must be a number
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
              <Controller
                name="route"
                rules={{ required: "Debe seleccionar una ruta" }}
                control={form.control}
                as={
                  <RoutesSelect
                    error={!!form.errors.route}
                    helperText={form.errors.route?.message}
                  />
                }
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.marginTop}>
            <Button startIcon={<SaveIcon />} disabled={loading} type="submit" variant="contained" color="primary">
              {loading ? 'Guardando' : 'Guardar'}
            </Button>
            <Button disabled={loading} onClick={onClose} variant="outlined">
              Descartar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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