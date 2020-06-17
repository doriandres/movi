import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm, Controller } from 'react-hook-form';
import { useMediaQuery, useTheme, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

import useStyles from "./../../shared/styles/forms";

export default function CreateRouteModal({ open, onClose }) {
  const classes = useStyles();
  const form = useForm();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.dir(data);
  };

  return (

    <Dialog open={!!open} maxWidth="md" fullWidth scroll="paper" fullScreen={fullScreen}>
      <DialogTitle>Agregar Ruta</DialogTitle>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off">
        <DialogContent>
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
          <div className={classes.marginTop}>
            <TextField
              label="Código de Transporte"
              name="code"
              inputRef={form.register({ required: "Debe insertar un código de transporte" })}
              variant="outlined"
              error={!!form.errors.code}
              helperText={form.errors.code?.message}
              fullWidth
            />
          </div>
          <div className={classes.marginTop}>
            <TextField
              label="Costo"
              name="cost"
              inputRef={form.register({
                required: "Debe insertar un costo",
                validate(val) {
                  const number = parseFloat(val);
                  if (Number.isNaN(number)) {
                    return "Debe insertar un costo válido";
                  }
                }
              })}
              variant="outlined"
              error={!!form.errors.cost}
              helperText={form.errors.cost?.message}
              fullWidth
            />
          </div>
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
          <div className={classes.marginTop}>
            <TextField
              label="Cantón"
              name="canton"
              inputRef={form.register({ required: "Debe insertar un cantón" })}
              variant="outlined"
              error={!!form.errors.canton}
              helperText={form.errors.canton?.message}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions className={classes.marginTop}>
          <Button onClick={onClose} color="primary">
            Descartar
          </Button>
          <Button type="submit" color="inherit">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  );
}