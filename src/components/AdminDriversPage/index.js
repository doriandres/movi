import React, { useState, useEffect } from 'react';
import { Container, Button, Paper, Grid, Typography } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RegisterDriverModal from './components/RegisterDriverModal';
import { get } from "axios";
import { API_URL } from '../../settings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Alert } from '@material-ui/lab';
import useStyles from "../shared/styles/forms";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AdminDriversPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [busDrivers, setBusDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const classes = useStyles();

  const hideCreate = () => {
    setShowCreate(false);
  };

  const onCreated = () => {
    loadDrivers();
  };

  const loadDrivers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-drivers/all`, { withCredentials: true })
      .then((response) => {
        setBusDrivers(response.data.result);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Hubo un error de conexión al cargar las opciones');
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    loadDrivers();
  }, []);



  return (
    <>
      <Container>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Registrar Conductor</Button>
      </Container>
      <RegisterDriverModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />

      <div className={classes.padding}>
        <Container>
          <div className={classes.root}>
            <Grid container>
              <Grid item lg={12} md={8} />
              <Grid item lg={12} md={8}>
                <Paper className={classes.padding}>
                  <Typography className={classes.marginTop} variant="h5">
                    Lista de Conductores
                                    </Typography>
                  <div className={classes.padding}>
                    <div>
                      {loading && <CircularProgress color="primary">{loading}</CircularProgress>}
                      {error && <Alert className={classes.alerts} severity="error">{error}</Alert>}
                      {!loading && !error && (busDrivers.length ? (
                        <TableContainer component={Paper}>
                          <Table className={classes.table} aria-label="Lista de Conductores">
                            <TableHead>
                              <TableRow>
                                <TableCell>Identificación</TableCell>
                                <TableCell >Nombre</TableCell>
                                <TableCell >Apellido</TableCell>
                                <TableCell >Ruta Asignada</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {busDrivers.map((busDriver) => (
                                <TableRow key={busDriver.citizenId}>
                                  <TableCell >{busDriver.citizenId}</TableCell>
                                  <TableCell >{busDriver.name}</TableCell>
                                  <TableCell >{busDriver.lastName}</TableCell>
                                  <TableCell >{busDriver.route.name}</TableCell></TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : <Alert className={classes.alerts} severity="warning">Alerta: No hay conductores registrados</Alert>
                      )}
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
}