import React, { useState, useEffect } from 'react';
import CreateRouteModal from './components/CreateRouteModal';
import { Container, Button } from '@material-ui/core';
import { get } from 'axios';
import AddIcon from "@material-ui/icons/Add";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import { API_URL } from '../../settings';
import Loading from '../Loading';

export default function AdminRoutesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [busRoutes, setBusRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hideCreate = () => {
    setShowCreate(false);
  };

  const loadRoutes = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-routes/all`, { withCredentials: true })
      .then((response) => {
        setBusRoutes(response.data.result);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Hubo un error de conexión al cargar las opciones');
      })
      .finally(() => setLoading(false))
  };


  const onCreated = () => {
    loadRoutes();
  };

  useEffect(() => {
    loadRoutes();
  }, []);


  return (
    <>
      <Container>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Crear Ruta</Button>
        {loading && <Loading />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (busRoutes.length ? (
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
        ) : <Alert severity="warning">No hay rutas registradas</Alert>)}


      </Container>
      <CreateRouteModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}