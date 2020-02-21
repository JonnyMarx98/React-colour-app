import sizes from './sizes';

export default {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    opacity: "1",
    marginBottom: "-5px",
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255,255,255,0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
    },

    [sizes.down("lg")] : {
      width: "75%",
      height: "33.33333%"
    },
    [sizes.down("md")] : {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")] : {
      width: "100%",
      height: "10%"
    }

  }
}