import React, { useState, useEffect } from 'react';
import { get } from "axios";
import { API_URL } from '../../../settings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Alert } from '@material-ui/lab';
import useStyles from "../../shared/styles/forms";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function GetDrivers() {

  const classes = useStyles();
  const [busDrivers, setBusDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const loadDrivers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-drivers/all`, { withCredentials: true })
      .then((response) => {
        setBusDrivers(response.data.result);
      })
      .catch(err => {
        setLoadError(err.response?.data?.error || 'Hubo un error de conexión al cargar las opciones');
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <>
      <div>
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
              {busDrivers.length ?
                busDrivers.map((busDriver) => (<TableRow><TableCell align="right">{busDriver.citizenId}</TableCell>
                  <TableCell >{busDriver.name}</TableCell>
                  <TableCell >{busDriver.lastName}</TableCell>
                  <TableCell >{busDriver.route.name}</TableCell></TableRow>))
                :
                <><CircularProgress color="primary">{loading}</CircularProgress>
                  <Alert className={classes.alerts} severity="error">Error: {loadError}</Alert></>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}


