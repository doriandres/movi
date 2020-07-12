/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
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
import { CUSTOMER } from '../../constants/roles';
import TripsIcon from "@material-ui/icons/AirportShuttle";
import groupBillsByMonthAndYear from '../shared/utils/groupBillsByMonthAndYear';
import getDateTimeString from '../shared/utils/getDateTimeString';

export default function CustomersTripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customerInfo = useSelector(selectAuth(CUSTOMER));
  const groups = useMemo(() => groupBillsByMonthAndYear(trips), [trips]);
  /**
   * Loads the data
   */
  const loadIncomes = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bills/customer/${customerInfo._id}`, { withCredentials: true })
      .then((response) => setTrips(response.data.result))
      .catch(err => setError(err.response?.data?.error || 'Hubo un error de conexión al cargar los viajes'))
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
          <TripsIcon /> Viajes
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
          trips.length ? (
            Object.entries(groups).map(([group, trips], index, list) => (
              <div key={index}>
                <Typography variant="h5">
                  {group}
                </Typography>
                <br />
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Ruta</TableCell>
                        <TableCell>Conductor</TableCell>
                        <TableCell>Fecha</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Iterate through the items to create table rows */}
                      {trips.map((trip) => (
                        <TableRow key={trip._id}>
                          <TableCell>{trip.route.code} - {trip.route.name}</TableCell>
                          <TableCell> {trip.driver.citizenId} - {trip.driver.name} {trip.driver.lastName}</TableCell>
                          <TableCell>{getDateTimeString(trip.date)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {index + 1 !== list.length && (
                  <>
                    <br />
                    <Divider />
                    <br />
                  </>
                )}
              </div>
            ))
          )
            :
            // Otherwise show an alert message to let the user know there's no data
            <Alert severity="warning">No hay viajes registrados</Alert>
        )}
      </Container>
    </>
  );
}