import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  InputBase,
  Paper,
  withStyles,
  makeStyles
} from "@material-ui/core";
import styles from "./styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Transaction } from "../services";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");


const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 12,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff"
    }
  }
}))(InputBase);

class NewTransaction extends React.Component {
  state = {
    myAddress: "",
    privateKey: "",
    users: [],
    receiverAddress: "",
    amount: 0,
    err: "",
    isLoading: false,
    isSuccessful: false
  };

  componentDidMount() {
    const { id } = this.props;
    const temp = JSON.parse(localStorage.getItem("users"));
    const me = temp.find(m => m.publicKey === id.toString());
    const us = temp.filter(u => u.publicKey !== id.toString());
    this.setState({
      myAddress: id.toString(),
      users: [...us],
      privateKey: me.privateKey
    });
  }

  handleChangeAddressReceiver = e => {
    this.setState({
      receiverAddress: e.target.value
    });
  };

  handleChangeAmount = e => {
    this.setState({
      amount: e.target.value
    });
  };

  createNewTransaction = () => {
    try {
      const { blockchain } = this.props;
      const { myAddress, receiverAddress, amount, privateKey } = this.state;
      const newTransaction = new Transaction(
        myAddress,
        receiverAddress,
        parseInt(amount)
      );
      const privKey = ec.keyFromPrivate(privateKey);
      newTransaction.signTransaction(privKey);
       blockchain.createTransaction(newTransaction);
      this.setState({
        isSuccessful: true
      });
      localStorage.setItem("data", JSON.stringify(blockchain));
    } catch (e) {
      alert(e)
      this.setState({
        isSuccessful: false
      });
    }
  };

  clear=()=>{
    this.setState({
      err: '',
      isLoading: false,
      isSuccessful: false,
      receiverAddress: "",
      amount: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      myAddress,
      users,
      receiverAddress,
      amount,
        isSuccessful
    } = this.state;

    return (
      <div>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.rootNewTransaction}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.formNewTransaction}
          >
            {isSuccessful?(
                <Grid container direction="column" justify="center" alignItems="center">
                  <CheckCircleIcon style={{color: 'green'}}/>
                  <Button
                      className={classes.buttonSuccess}
                      onClick={this.clear}
                  >
                    Done
                  </Button>
                </Grid>

            ):(<>
              <Paper
                  component="form"
                  className={classes.paper}
                  variant="outlined"
              >
                <Typography className={classes.typo}>From</Typography>
                <InputBase className={classes.input} value={myAddress} disabled />
              </Paper>
              <Paper
                  component="form"
                  className={classes.paper}
                  variant="outlined"
              >
                <Typography className={classes.typo}>To</Typography>
                {/*<InputBase className={classes.input}/>*/}
                <FormControl style={{ flex: 1 }}>
                  <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={receiverAddress}
                      onChange={this.handleChangeAddressReceiver}
                      input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>Choose receiver</em>
                    </MenuItem>
                    {users.map((user, index) => {
                      return (
                          <MenuItem key={index} value={user.publicKey}>
                            user {user.id.toString()}
                          </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Paper>
              <Paper
                  component="form"
                  className={classes.paper}
                  variant="outlined"
              >
                <Typography className={classes.typo}>Amount</Typography>
                <InputBase
                    className={classes.input}
                    type="number"
                    value={amount}
                    onChange={this.handleChangeAmount}
                />
              </Paper>
              <Button
                  className={classes.buttonNewTransaction}
                  onClick={this.createNewTransaction}
              >
                Create Transaction
              </Button>

            </>)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(NewTransaction);
