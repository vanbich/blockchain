import React from "react";
import Navbar from "../components/Navbar";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import Grid from "@material-ui/core/Grid";
import BlockChain from "../services";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Blocks from "../components/Block";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Detail extends React.Component {
  state = {
    blockchain: new BlockChain(),
    blocks: [],
    balance: 0
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const data = localStorage.getItem("data");

    if (data) {
      const BC = { ...JSON.parse(data) };

      let temp = new BlockChain();
      temp.createTo(BC);

      this.setState({
        blockchain: temp,
        blocks: [...temp.blockchain],
        publicKey: id.toString(),
        balance: temp.getBalance(id)
      });
    } else {
      const key = ec.genKeyPair();
      const publicKey = key.getPublic('hex');
      const temp = new BlockChain(publicKey,id);
      console.log('temp',temp.getBalance(id));
      this.setState({
        blockchain: temp,
        balance: temp.getBalance(id)
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { blockchain, balance } = this.state;
    console.log("abc", blockchain);
    return (
      <div>
        <Navbar blockchain={blockchain} />
        <Grid container direction="row" justify="center" alignItems="center">
          <Card className={classes.rootWallet} variant="outlined">
            <div className={classes.details}>
              <CardMedia className={classes.cover}>
                <AccountBalanceWalletRoundedIcon
                  style={{ fontSize: 100, color: "#d4145a" }}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  style={{
                    fontFamily: "Roboto",
                    textTransform: "uppercase",
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  Total balance
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {console.log("mmmmmm", blockchain)}
                  {balance}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <List className={classes.rootDetail}>
          <Grid container direction="column-reverse">
            {blockchain.blockchain.map(block => {
              return (
                <ListItem key={block.index}>
                  <Blocks
                    index={block.index}
                    time={block.timestamp}
                    prev={block.prevHash}
                    hash={block.hash}
                    nonce={block.nonce}
                    transactions={[...block.data]}
                  />
                </ListItem>
              );
            })}
          </Grid>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Detail);
