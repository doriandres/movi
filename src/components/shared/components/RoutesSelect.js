import React, { useState, useEffect } from "react";
import { get } from "axios";
import { API_URL } from "../../../settings";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@material-ui/core";

export default function RoutesSelect({ label = "Ruta", value = "", onChange = () => { }, error = true, helperText = "" }) {
  const [busRoutes, setBusRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const loadRoutes = () => {
    setLoading(true);
    get(`${API_URL}api/v1/bus-routes/all`, { withCredentials: true })
      .then((response) => {
        setBusRoutes(response.data.result);
      })
      .catch(err => {
        setLoadError(err.response?.data?.error || 'Hubo un error de conexión al cargar las opciones');
      })
      .finally(() => setLoading(false))
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="bus-routes-select" error={error}>{label}</InputLabel>
      <Select
        labelId="bus-routes-select"
        label={label}
        error={error}
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={loading || !!loadError}
      >
        {busRoutes.length ?
          busRoutes.map(busRoute => <MenuItem key={busRoute._id} value={busRoute._id}>{busRoute.name}</MenuItem>)
          :
          <MenuItem value="">No hay opciones disponibles</MenuItem>
        }
      </Select>
      <FormHelperText error={error}>{
        helperText || (loading && "Cargando opciones...") || loadError
      }</FormHelperText>
    </FormControl>
  )
}