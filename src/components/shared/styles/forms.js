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
  center: {
    textAlign: 'center'
  },
  noMarginTop: {
    marginTop: 0,
  },
  flex: {
    display: "flex",
    justifyContent: "space-around"
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