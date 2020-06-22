import { MDCDataTable } from '@material/data-table';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import useStyles from "./../../shared/styles/forms";
import { get } from "axios";
import { Container } from '@material-ui/core';
import { API_URL } from '../../../settings';
export default function GetDrivers() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const form = useForm();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cleanError = () => {
    setError(null);
  };

  const onSuccess = () => {
    dispatch();
  };

  const onFail = (error) => {
    setError(error);
    setLoading(false);
  };

  const onSubmit = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-drivers/all`)
      .then((response) => onSuccess(response.data.result))
      .catch(error => onFail(error.response?.data?.error || 'Hubo un error de conexión'));
  };

  return (
    <>
      <Container>
      <div class="mdc-data-table">
          <table class="mdc-data-table__table" aria-label="Lista de Conductores">
            <thead>
              <tr class="mdc-data-table__header-row">
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Identificación</th>
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Nombre</th>
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Apellido</th>
                <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Ruta Asignada</th>
              </tr>
            </thead>
            <tbody class="mdc-data-table__content">
              <tr class="mdc-data-table__row">
                <td class="mdc-data-table__cell">111568785</td>
                <td class="mdc-data-table__cell">Prueba1</td>
                <td class="mdc-data-table__cell">Apellido1</td>
                <td class="mdc-data-table__cell">Ruta1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}


