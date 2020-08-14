import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton } from '@material-ui/core';
import { get, put } from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import { API_URL } from '../../settings';
import Loading from '../Loading';
import RestoreIcon from '@material-ui/icons/Restore';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RejectedUserIcon from "@material-ui/icons/Block";

/**
 * Gets the age based on the born date
 * @param {Date|String} bornDate born date
 * @returns {Number} Age
 */
function getAge(bornDate) {
  return Math.floor(new Date(Date.now() - new Date(bornDate).getTime()).getTime() / (1000 * 60 * 60 * 8760));
}

/**
 * Administration Users page component
 */
export default function AdminInactiveUsersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRestoreConfirmation, setShowRestoreConfirmation] = useState(false);
  const [stagedUserToRestore, setStagedUserToRestore] = useState(false);
  const [loadingRestore, setLoadingRestore] = useState(false);
  const [restoreError, setRestoreError] = useState(null);


  const cleanBanError = () => setRestoreError(null);

  const stageUserToRestore = (id) => () => {
    setStagedUserToRestore(id);
    setShowRestoreConfirmation(true);
  };

  const cancelRestore = () => {
    setStagedUserToRestore(null);
    setShowRestoreConfirmation(false);
  };

  const performRestore = () => {
    setLoadingRestore(true);
    put(`${API_URL}api/v1/customers/restore/${stagedUserToRestore}`, null, { withCredentials: true })
      .then(() => loadUsers())
      .catch(err => setRestoreError(err.response?.data?.error || 'Hubo un error de conexión al restaurar el usuario'))
      .finally(() => {
        cancelRestore();
        setLoadingRestore(false);
      });
  };

  /**
   * Loads the data
   */
  const loadUsers = () => {
    setLoading(true);
    get(`${API_URL}api/v1/customers/all/inactive`, { withCredentials: true })
      .then((response) => setCustomers(response.data.result))
      .catch(err => setError(err.response?.data?.error || 'Hubo un error de conexión al cargar los usuarios'))
      .finally(() => setLoading(false))
  };

  // Use effect hook to load data when the component gets displayed for the first time
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Container>

        {/* Page title */}
        <Typography variant="h4">
          <RejectedUserIcon /> Usuarios Deshabilitados
        </Typography>
        <br />

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
          customers.length ?
            // Display the table
            (<TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell padding="checkbox">Restaurar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate through the items to create table rows */}
                  {customers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell>{customer.code}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.lastName}</TableCell>
                      <TableCell>{getAge(customer.bornDate)}</TableCell>
                      <TableCell>
                        <IconButton title="Deshabilitar usuario" onClick={stageUserToRestore(customer._id)}>
                          <RestoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>)
            :
            // Otherwise show an alert message to let the user know there's no data
            <Alert severity="warning">No hay usuarios registrados</Alert>
        )}
      </Container>

      <Dialog open={showRestoreConfirmation}>
        <DialogTitle>Atención</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea restaurar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loadingRestore} onClick={performRestore} color="primary">
            {loadingRestore ? "Restaurando" : "Restaurar"}
          </Button>
          <Button disabled={loadingRestore} onClick={cancelRestore} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={!!restoreError} onClose={cleanBanError}>
        <DialogTitle>Lo sentimos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {restoreError}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cleanBanError} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}