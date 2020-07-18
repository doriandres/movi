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
import IncomesIcon from "@material-ui/icons/InsertChart";

function getDateTimeString(date) {
  const _date = new Date(date);
  return `${_date.toLocaleDateString()} ${_date.toLocaleTimeString()}`;
}

/**
 * Drivers incomes report page component
 */
export default function DriversIncomesReport() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const driverInfo = useSelector(selectAuth(DRIVER));

  /**
   * Loads the data
   */
  const loadIncomes = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bills/driver/${driverInfo._id}`, { withCredentials: true })
      .then((response) => setIncomes(response.data.result))
      .catch(err => setError(err.response?.data?.error || 'Hubo un error de conexión al cargar los ingresos'))
      .finally(() => setLoading(false))
  };


  // Use effect hook to load data when the component gets displayed for the first time
  useEffect(() => {
    loadIncomes();
  }, []);

  return (
    <>
      <Container>

        {/* Page title */}
        <Typography variant="h4">
          <IncomesIcon /> Ingresos
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
          incomes.length ? (
            // Display the table
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Costo</TableCell>
                    <TableCell>Ruta</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate through the items to create table rows */}
                  {incomes.map((income) => (
                    <TableRow key={income._id}>
                      <TableCell>₡ {income.cost}</TableCell>
                      <TableCell>{income.route.code} - {income.route.name}</TableCell>
                      <TableCell>{income.customer.name} {income.customer.lastName}</TableCell>
                      <TableCell>{getDateTimeString(income.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
            :
            // Otherwise show an alert message to let the user know there's no data
            <Alert severity="warning">No hay ingresos registrados</Alert>
        )}
      </Container>
    </>
  );
}