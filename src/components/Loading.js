import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "400px",
    alignContent: "center",
    justifyContent: "center"
  }
}));

/**
 * Loading component
 * Displays an spinner
 */
export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size={50} />
    </div>
  );
}