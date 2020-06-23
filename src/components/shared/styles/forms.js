import { makeStyles } from "@material-ui/core/";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(4),
  },
  noMarginTop: {
    marginTop: 0,
  },

  alerts: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }



}));