import React, { useState, useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RegisterDriverModal from './components/RegisterDriverModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { get } from "axios";
import { API_URL } from '../../settings';
import Loading from '../Loading';

export default function AdminDriversPage() {

  const [showCreate, setShowCreate] = useState(false);
  const [busDrivers, setBusDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const hideCreate = () => {
    setShowCreate(false);
  };

  const loadDrivers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-drivers/all`, { withCredentials: true })
      .then((response) => {
        setBusDrivers(response.data.result);
      })
      .catch(err => {
        setLoadError(err.response?.data?.error || 'Hubo un error de conexión al cargar los conductores');
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const onCreated = () => {
    loadDrivers();
  };

  return (
    <>
      <Container>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Registrar Conductor</Button>
        <br /><br />
        {loading && <Loading />}
        {loadError && <Alert severity="error">{loadError}</Alert>}
        {!loading && !loadError && (
          busDrivers.length ? (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Identificación</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Ruta Asignada</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {busDrivers.map((busDrivers) => (
                    <TableRow key={busDrivers._id}>
                      <TableCell>{busDrivers.citizenId}</TableCell>
                      <TableCell>{busDrivers.name}</TableCell>
                      <TableCell>{busDrivers.lastName}</TableCell>
                      <TableCell>{busDrivers.route.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
            :
            <Alert severity="warning">No hay conductores registrados</Alert>
        )}
      </Container>
      <RegisterDriverModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}