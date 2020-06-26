import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { get } from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import { API_URL } from '../../settings';
import Loading from '../Loading';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

function getAge(bornDate) {
  return Math.floor(new Date(Date.now() - new Date(bornDate).getTime()).getTime() / (1000 * 60 * 60 * 8760));
}

export default function AdminUsersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadUsers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/customers/all`, { withCredentials: true })
      .then((response) => {
        setCustomers(response.data.result);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Hubo un error de conexión al cargar los usuarios');
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    loadUsers();
  }, []);


  return (
    <>
      <Container>
        <Typography variant="h4">
          Usuarios
        </Typography>
        <br />
        {loading && <Loading />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          customers.length ?
            (<TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Correo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Edad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.lastName}</TableCell>
                      <TableCell>{getAge(customer.bornDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)
            :
            <Alert severity="warning">No hay usuarios registradas</Alert>
        )}
      </Container>
    </>
  );
}