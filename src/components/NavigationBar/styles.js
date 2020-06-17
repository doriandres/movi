import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  titleMenu: {
    marginTop: "20px"
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
  menu: {
    width: "250px"
  }
}));