import React, { useState } from 'react';
import { Container, Button, Paper, Grid, Typography } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../shared/styles/forms";
import RegisterDriverModal from './components/RegisterDriverModal';

export default function AdminDriversPage() {
  const [showCreate, setShowCreate] = useState(false);

  const classes = useStyles();

  const hideCreate = () => {
    setShowCreate(false);
  };

  const onCreated = () => {
    // TODO: Reload table
  };

  return (
    <>
      <Container>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Registrar Conductor</Button>
      </Container>
      <RegisterDriverModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
      <div className={classes.padding}>
      <Paper className={classes.padding}>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} md={8} />
          <Grid item lg={12} md={8}>
            <Paper className={classes.padding}>
              <Typography className={classes.marginTop} variant="h5">
              Lista de Conductores
              </Typography>
              <form
                className={classes.marginTop}
                autoComplete="off">               
              </form>
              </Paper>
              </Grid>
        </Grid>
      </div>
      </Paper>
      </div>
    </>
  );
}