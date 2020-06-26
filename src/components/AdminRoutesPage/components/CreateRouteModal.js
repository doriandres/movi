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
import { useMediaQuery, useTheme, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";
import useStyles from "./../../shared/styles/forms";
import { API_URL } from '../../../settings';

export default function CreateRouteModal({ open, onClose = () => { }, onCreated = () => { } }) {
  const classes = useStyles();

  // Form manager
  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      cost: "",
      province: "",
      canton: ""
    }
  });

  const theme = useTheme();

  // If the theme detects we are in a mobile device fullscreen will be true
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cleans any errors
  const cleanError = () => {
    setError(null);
  };

  // Form submission success handler
  const onSuccess = () => {
    onCreated();
    onClose();
    form.reset();
    setLoading(false);
  };

  // Form submission fail handler
  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  // Form submit event handler
  const onSubmit = (data) => {
    setLoading(true);
    post(`${API_URL}api/v1/bus-routes/insert`, data, { withCredentials: true })
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  return (
    <>

      {/* The component is a modal so it is completely wrapped in a Dialog component */}
      <Dialog open={!!open} maxWidth="sm" fullWidth scroll="paper" fullScreen={fullScreen}>
        <DialogTitle>Agregar Ruta</DialogTitle>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off">
          <DialogContent>

            {/* Name field */}
            <div>
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

            {/* Code field */}
            <div className={classes.marginTop}>
              <TextField
                label="Código de Transporte"
                name="code"
                inputRef={form.register({
                  required: "Debe insertar un código de transporte",
                  validate(value) {
                    if (!(/^[A-Z]{3}-[0-9]{3}$/.test(value))) {
                      return "Debe utilizar el formato \"XXX-000\"";
                    }
                  }
                })}
                variant="outlined"
                error={!!form.errors.code}
                helperText={form.errors.code?.message}
                fullWidth
              />
            </div>

            {/* Cost field */}
            <div className={classes.marginTop}>
              <TextField
                label="Costo"
                name="cost"
                inputRef={form.register({
                  required: "Debe insertar un costo",
                  validate(val) {
                    if (isNaN(val)) {
                      return "Debe insertar un costo válido";
                    }
                    if (parseFloat(val) < 0) {
                      return "Debe insertar un costo no negativo";
                    }
                  }
                })}
                variant="outlined"
                error={!!form.errors.cost}
                helperText={form.errors.cost?.message}
                fullWidth
              />
            </div>

            {/* Provinces field */}
            <FormControl fullWidth variant="outlined" className={classes.marginTop}>
              <InputLabel id="provice-select" error={!!form.errors.province}>Provincia</InputLabel>
              <Controller
                control={form.control}
                name="province"
                rules={{ required: "Debe elegir una provincia" }}
                as={
                  <Select
                    labelId="provice-select"
                    label="Provincia"
                    error={!!form.errors.province}
                  >
                    <MenuItem value="San José">San José</MenuItem>
                    <MenuItem value="Alajuela">Alajuela</MenuItem>
                    <MenuItem value="Cartago">Cartago</MenuItem>
                    <MenuItem value="Heredia">Heredia</MenuItem>
                    <MenuItem value="Guanacaste">Guanacaste</MenuItem>
                    <MenuItem value="Puntarenas">Puntarenas</MenuItem>
                    <MenuItem value="Limón">Limón</MenuItem>
                  </Select>
                }
              />
              <FormHelperText error={!!form.errors.province}>{form.errors.province?.message}</FormHelperText>
            </FormControl>

            {/* Canton field */}
            <div className={classes.marginTop}>
              <TextField
                label="Cantón"
                name="canton"
                inputRef={form.register({
                  required: "Debe insertar un cantón",
                  validate(value) {
                    if (!(/^[a-zA-Z ]+$/.test(value))) {
                      return "Debe insertar solo letras y espacios"
                    }
                  }
                })}
                variant="outlined"
                error={!!form.errors.canton}
                helperText={form.errors.canton?.message}
                fullWidth
              />
            </div>
          </DialogContent>

          {/* Modal actions */}
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

      {/* Error modal */}
      <Dialog open={!!error} onClose={cleanError} maxWidth="xs" fullWidth>
        <DialogTitle>Lo sentimos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Error message */}
            {error}
          </DialogContentText>
        </DialogContent>
        {/* Modal actions */}
        <DialogActions>
          <Button onClick={cleanError} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}