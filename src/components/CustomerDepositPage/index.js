import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { put } from "axios";
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
import { CUSTOMER } from '../../constants/roles';
import { useHistory } from 'react-router-dom';
import { CUSTOMERS_BALANCE } from '../../locations';
import DepositIcon from "@material-ui/icons/Payment";

export default function CustomerDepositPage() {
  const classes = useStyles();
  const history = useHistory();

  // Retrieve session
  const customerInfo = useSelector(selectAuth(CUSTOMER));

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
    history.push(CUSTOMERS_BALANCE());
  };

  // Form submit event handler
  const onSubmit = ({ amount }) => {
    setLoading(true);
    put(`${API_URL}api/v1/customers/deposit`, {
      customer: customerInfo._id,
      amount: parseFloat(amount)
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
        <Container>
          {/* These grids are to center the component in medium and large screen size devices */}
          <Grid container>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={4}>
              <Paper className={classes.padding}>
                {/* Form title */}
                <Typography className={classes.noMarginTop} variant="h5">
                  <DepositIcon /> Depositar
                </Typography>
                <Typography variant="body1">
                  ¿Cuanto dinero desea depositar en su cuenta?
                </Typography>
                <form
                  className={classes.marginTop}
                  onSubmit={form.handleSubmit(onSubmit)}
                  autoComplete="off">

                  <div>
                    <TextField
                      label="Monto"
                      name="amount"
                      type="tel"
                      inputRef={form.register({
                        required: "Debe insertar un monto",
                        validate(val) {
                          if (isNaN(val)) {
                            return "Debe insertar un monto válido";
                          }
                          if (parseFloat(val) < 0) {
                            return "Debe insertar un monto no negativo";
                          }
                        }
                      })}
                      variant="outlined"
                      error={!!form.errors.amount}
                      helperText={form.errors.amount?.message}
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
                      {loading ? "Procesando" : "Depositar"}
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

      {/* Info modal */}
      <Dialog open={!!showSuccess} onClose={closeInfo} maxWidth="xs" fullWidth>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El deposito se ha realizado exitósamente
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