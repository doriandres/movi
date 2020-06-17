import React, { useState } from 'react';
import CreateRouteModal from './components/CreateRouteModal';
import { Container, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
export default function AdminRoutesPage() {
  const [showCreate, setShowCreate] = useState(false);

  const hideCreate = () => {
    setShowCreate(false);
  };

  const onCreated = () => {
    // TODO: Reload table
  };

  return (
    <>
      <Container>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Crear Ruta</Button>
      </Container>
      <CreateRouteModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}