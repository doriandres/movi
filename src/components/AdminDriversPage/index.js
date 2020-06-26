import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
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

/**
 * Administration Drivers page component
 */
export default function AdminDriversPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [busDrivers, setBusDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  /**
   * Hides the create modal
   */
  const hideCreate = () => {
    setShowCreate(false);
  };

  /**
   * Loads the data
   */
  const loadDrivers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-drivers/all`, { withCredentials: true })
      .then((response) => setBusDrivers(response.data.result))
      .catch(err => setLoadError(err.response?.data?.error || 'Hubo un error de conexión al cargar los conductores'))
      .finally(() => setLoading(false))
  };

  /**
   * Callback handler to be executed when a new item is created
   */
  const onCreated = () => {
    loadDrivers();
  };

  // Use effect hook to load data when the component gets displayed for the first time
  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <>
      <Container>

        {/* Page title */}
        <Typography variant="h4">
          Conductores
        </Typography>
        <br />

        {/* Add button */}
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Registrar Conductor</Button>
        <br /><br />

        {/* If loading display loading spinner */}
        {loading && <Loading />}

        {/* If there's a loadError display an alert message */}
        {loadError && <Alert severity="error">{loadError}</Alert>}

        {/* 
          If there's no error and it is not loading
          Display the content
        */}
        {!loading && !loadError && (
          // If there are items
          busDrivers.length ? (
            // Display the table
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
                  {/* Iterate through the items to create table rows */}
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
            // Otherwise show an alert message to let the user know there's no data
            <Alert severity="warning">No hay conductores registrados</Alert>
        )}
      </Container>

      {/* Add modal */}
      <RegisterDriverModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}