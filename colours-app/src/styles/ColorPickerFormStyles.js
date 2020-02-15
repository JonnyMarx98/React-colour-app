import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  picker: {
    width: "100% !important",
    marginTop: "2rems"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "2rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
}));

export default useStyles;