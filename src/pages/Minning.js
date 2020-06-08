import React from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import styles from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const PopupValue = props => {
  const { value } = props;
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Typography
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "200px",
              height: "auto",
              fontSize: 11
            }}
            {...bindTrigger(popupState)}
          >
            {value}
          </Typography>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Box p={2}>
              <Typography
                style={{
                  fontSize: 11
                }}
              >
                {value}
              </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));
function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}

class Mining extends React.Component {
  state = {
    spending: [],
    privateKey: "",
    isLoading: false
  };

  componentDidMount() {
    const { blockchain, id } = this.props;
    const temp = JSON.parse(localStorage.getItem("users"));
    const me = temp.find(m => m.publicKey === id.toString());
    console.log(
      "blockchain.spendingTransactions",
      blockchain.spendingTransactions
    );
    this.setState({
      spending: [...blockchain.spendingTransactions],
      privateKey: me.privateKey
    });
  }

  mine = async () => {
    this.setState({ isLoading: true });
    try {
      const { privateKey } = this.state;
      const { blockchain } = this.props;

      const myKey = ec.keyFromPrivate(privateKey);
      const myWalletAddress = myKey.getPublic("hex");

      await blockchain.miningTransactions(myWalletAddress);
      localStorage.setItem("data", JSON.stringify(blockchain));

      this.setState({
        isLoading: false,
        spending: [...blockchain.spendingTransactions]
      });
    } catch (e) {
      this.setState({
        isLoading: false
      });
      alert(e);
    }
  };

  render() {
    const { classes } = this.props;
    const { spending, isLoading } = this.state;
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.rootMining}
        >
          <div className={classes.tableMining}>
            {spending.length === 0 ? (
              <Typography style={{textAlign: 'center'}}>No transaction</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">From</TableCell>
                  <TableCell align="center">To</TableCell>
                  <TableCell align="center">Amount</TableCell>
                </TableHead>
                <TableBody>
                  {spending.map(transaction => {
                    return (
                      <TableRow>
                        <TableCell align="center">0</TableCell>

                        <TableCell align="center">
                          <PopupValue value={transaction.fromAdd} />
                        </TableCell>
                        <TableCell align="center">
                          <PopupValue value={transaction.toAdd} />
                        </TableCell>
                        <TableCell align="center">
                          <Typography className={classes.valueMining}>
                            {transaction.amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            {isLoading && <CircularIndeterminate />}

          </div>
          {spending.length !== 0 && (
            <Button className={classes.buttonMining} onClick={this.mine}>
              Mine
            </Button>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Mining);
