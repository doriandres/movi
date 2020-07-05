import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  bar: {
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-50px'
  },
  titleMenu: {
    marginTop: "20px",
    marginLeft: '50px',
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
  menu: {
    width: "250px"
  }
}));