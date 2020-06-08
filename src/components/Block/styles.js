export default theme => ({
  root1: {
    width: "25%",
    margin: theme.spacing.unit * 2
  },
  root2: {
    width: "50%",
    margin: theme.spacing.unit * 2,
    height: "100%"
  },

  active1: {
    width: "25%",
    margin: theme.spacing.unit * 2,
    border: "1px solid #F8c9ca",
    boxShadow: "0 8px 16px 0 rgba(248, 201, 202, 1)"
  },
  active2: {
    width: "50%",
    margin: theme.spacing.unit * 2,
    height: "100%",
    border: "1px solid #F8c9ca",
    boxShadow: "0 8px 16px 0 rgba(248, 201, 202, 1)"
  },
  paper: {
    display: "flex",
    alignItems: "center",
    width: "auto",
    marginBottom: theme.spacing.unit
  },
  input: {
    marginLeft: theme.spacing.unit,
    flex: 1,
    fontSize: 12
  },
  input_hash: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 12,
    color: "green"
  },

  typo: {
    padding: 10,
    fontSize: 11,
    backgroundColor: "#ebebeb",
    textTransform: "uppercase",
      width: 70,
      textAlign: 'center'
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    margin: 10,
      fontSize: 15,
      fontWeight: 'bold',
  }
});
