export default theme => ({
  root: {
    width: "100%",
    height: "auto",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)

  },
  rootWallet: {
    display: 'flex',
    width: 300,
    marginTop: theme.spacing(3)
  },
  rootDetail: {
    width: "100%",
    flexGrow: 1
  },

  rootMining: {
    marginTop: "1%"
  },
  brand: {
    textTransform: "uppercase",
    background: "-webkit-linear-gradient(45deg,#d4145a,#fbb03b)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontSize: 35,
    fontWeight: "bold"
  },
  titleUser: {
    textAlign: "center",
    textTransform: "uppercase",
    margin: 10,
    fontSize: 15,
    fontWeight: "bold"
  },

  sub_brand: {
    textTransform: "uppercase",
    color: "#d4145a",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: theme.spacing(2)
  },

  cardUser: {
    width: "35%",
    height: "35%",
    margin: theme.spacing(3)
  },
  cardPeer: {
    width: "10%",
    padding: "4%"
  },
  buttonStart: {
    width: "auto",
    height: 40,
    color: "#d45680",
    fontWeight: "bold",
    "&:hover": {
      color: "#d45680"
    },
    margin: 5
  },
  buttonAddPeer: {
    borderRadius: 50,
    width: 100,
    height: 40,
    marginLeft: 10,
    background: "#d4145a",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#d4145a",
      color: "#fff"
    }
  },
  containerUser: {
    width: "85%",
    marginTop: theme.spacing(2),
    borderRadius: 5,
    padding: "1%"
  },



  tableMining: {
    width: "80%",
    margin: "2%",
    border: "1px solid #f8c9ca",
    borderRadius: 5,
    padding: "1%"
  },

  valueMining: {
    fontSize: 11,
    width: "200px"
  },

  buttonMining: {
    background: "#d4145a",
    color: "#ffffff",
    borderRadius: 50,
    width: 100,
    marginTop: "2%",
    "&:hover": {
      background: "#d4145a",
      color: "#ffffff"
    }
  },

  rootNewTransaction: {
    marginTop: "1%"
  },


  formNewTransaction: {
    width: "60%",
    marginTop: "2%",
    borderRadius: 5,
    padding: "1%"
  },

  paper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  input: {
    marginLeft: theme.spacing.unit,
    flex: 1,
    fontSize: 12
  },

  typo: {
    padding: 10,
    fontSize: 12,
    backgroundColor: "#ebebeb",
    textTransform: "uppercase"
  },

  buttonNewTransaction: {
    background: "#d4145a",
    color: "#ffffff",
    borderRadius: 50,
    width: "auto",
    marginTop: "2%",
    "&:hover": {
      background: "#d4145a",
      color: "#ffffff"
    }
  },
  buttonSuccess: {
    background: "green",
    color: "#ffffff",
    borderRadius: 50,
    width: "auto",
    marginTop: "2%",
    "&:hover": {
      background: "green",
      color: "#ffffff"
    }
  },

  content: {
    flex: '0 1 auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  cover: {
    width: 120,
  },
});
