import React, { useState, useEffect } from 'react';
import CreateRouteModal from './components/CreateRouteModal';
import { Container, Button, Typography } from '@material-ui/core';
import { get } from 'axios';
import AddIcon from "@material-ui/icons/Add";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { API_URL } from '../../settings';
import Loading from '../Loading';

/**
 * Administration Routes page component
 */
export default function AdminRoutesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [busRoutes, setBusRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Hides the create modal
   */
  const hideCreate = () => {
    setShowCreate(false);
  };

  /**
   * Loads the data
   */
  const loadRoutes = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-routes/all`, { withCredentials: true })
      .then((response) => setBusRoutes(response.data.result))
      .catch(err => setError(err.response?.data?.error || 'Hubo un error de conexión al cargar las rutas'))
      .finally(() => setLoading(false))
  };

  /**
   * Callback handler to be executed when a new item is created
   */
  const onCreated = () => {
    loadRoutes();
  };

  // Use effect hook to load data when the component gets displayed for the first time
  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <>
      <Container>

        {/* Page title */}
        <Typography variant="h4">
          Rutas
        </Typography>
        <br />

        {/* Add button */}
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Crear Ruta</Button>
        <br /><br />

        {/* If loading display loading spinner */}
        {loading && <Loading />}

        {/* If there's a loadError display an alert message */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* 
          If there's no error and it is not loading
          Display the content
        */}
        {!loading && !error && (
          // If there are items
          busRoutes.length ? (
            // Display the table
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Costo</TableCell>
                    <TableCell>Provincia</TableCell>
                    <TableCell>Canton</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate through the items to create table rows */}
                  {busRoutes.map((busRoute) => (
                    <TableRow key={busRoute._id}>
                      <TableCell>{busRoute.name}</TableCell>
                      <TableCell>{busRoute.code}</TableCell>
                      <TableCell>₡ {busRoute.cost}</TableCell>
                      <TableCell>{busRoute.province}</TableCell>
                      <TableCell>{busRoute.canton}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
            :
            // Otherwise show an alert message to let the user know there's no data
            <Alert severity="warning">No hay rutas registradas</Alert>
        )}
      </Container>

      {/* Add modal */}
      <CreateRouteModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}