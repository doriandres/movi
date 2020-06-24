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
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hideCreate = () => {
    setShowCreate(false);
  };

  const loadUsers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/customers/all`, { withCredentials: true })
      .then((response) => {
        setBusRoutes(response.data.result);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Hubo un error de conexión al cargar las opciones');
      })
      .finally(() => setLoading(false))
  };


  const onCreated = () => {
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);


  return (
    <>
      <Container>
        {loading && <Loading />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (customers.length ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Identificacion</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Edad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{new Date() - user.bornDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : <Alert severity="warning">No hay usuarios registradas</Alert>)}


      </Container>
      <CreateRouteModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}