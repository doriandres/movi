import React, { useState } from 'react';
import { Container, Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RegisterDriverModal from './components/RegisterDriverModal';

export default function AdminDriversPage() {
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
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowCreate(true)} color="primary">Registrar Conductor</Button>
      </Container>
      <RegisterDriverModal open={showCreate} onClose={hideCreate} onCreated={onCreated} />
    </>
  );
}