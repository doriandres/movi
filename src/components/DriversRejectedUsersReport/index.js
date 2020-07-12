/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { get } from 'axios';
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
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { DRIVER } from '../../constants/roles';
import RejectedIcon from "@material-ui/icons/Report";
import getDateTimeString from '../shared/utils/getDateTimeString';

/**
 * Drivers incomes report page component
 */
export default function DriversRejectedUsersReport() {
  const [rejections, setRejections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const driverInfo = useSelector(selectAuth(DRIVER));

  /**
   * Loads the data
   */
  const loadRejections = () => {
    setLoading(true);
    get(`${API_URL}api/v1/rejections/driver/${driverInfo._id}`, { withCredentials: true })
      .then((response) => setRejections(response.data.result))
      .catch(err => setError(err.response?.data?.error || 'Hubo un error de conexión al cargar los rechazos'))
      .finally(() => setLoading(false))
  };


  // Use effect hook to load data when the component gets displayed for the first time
  useEffect(() => {
    loadRejections();
  }, []);

  return (
    <>
      <Container>

        {/* Page title */}
        <Typography variant="h4">
          <RejectedIcon /> Rechazos
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
          rejections.length ? (
            // Display the table
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Ruta</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate through the items to create table rows */}
                  {rejections.map((rejection) => (
                    <TableRow key={rejection._id}>
                      <TableCell>{rejection.customer.code}</TableCell>
                      <TableCell>{rejection.route.code} - {rejection.route.name}</TableCell>
                      <TableCell>{getDateTimeString(rejection.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
            :
            // Otherwise show an alert message to let the user know there's no data
            <Alert severity="warning">No hay rechazos registrados</Alert>
        )}
      </Container>
    </>
  );
}