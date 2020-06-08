import React from "react";
import {  withStyles } from "@material-ui/core/styles";
import { Card, Paper, InputBase, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Box from "@material-ui/core/Box";
import styles from "./styles";

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
              width: "120px",
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
class Blocks extends React.Component {
  state = {
    isHover: false
  };
  effectSelectBlock = () => {
    this.setState({
      isHover: true
    });
  };

  effectSelectBlockLeave = () => {
    this.setState({
      isHover: false
    });
  };

  render() {
    const { index, time, prev, hash, nonce, classes, transactions } = this.props;
    const { isHover } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        onMouseDown={this.effectSelectBlock}
        onMouseLeave={this.effectSelectBlockLeave}
      >
        <Card
          variant="outlined"
          className={isHover ? classes.active1 : classes.root1}
        >
          <Grid container direction="column">
            <Typography className={classes.title}>Block {index === 0 ? "Genesis" : index.toString()} </Typography>
            <Divider />
            <CardContent>
              <Paper
                component="form"
                className={classes.paper}
                variant="outlined"
              >
                <Typography className={classes.typo}>Time</Typography>
                <InputBase className={classes.input} value={time} />
              </Paper>
              <Paper
                component="form"
                className={classes.paper}
                variant="outlined"
              >
                <Typography className={classes.typo}>Nonce</Typography>
                <InputBase className={classes.input} value={nonce} />
              </Paper>

              <Paper
                component="form"
                className={classes.paper}
                variant="outlined"
              >
                <Typography className={classes.typo}>Prev hash</Typography>
                <InputBase className={classes.input_hash} value={prev} />
              </Paper>

              <Paper
                component="form"
                className={classes.paper}
                variant="outlined"
              >
                <Typography className={classes.typo}>Hash</Typography>
                <InputBase className={classes.input_hash} value={hash} />
              </Paper>
            </CardContent>
          </Grid>
        </Card>
        <Card
          variant="outlined"
          className={isHover ? classes.active2 : classes.root2}
        >
          <Grid container direction="column">
            <Typography variant="h6" className={classes.title}>Transactions {index === 0 ? "Genesis" : 'on Block' + index.toString()} </Typography>
            <Divider />
            <CardContent style={{  width: "100px" }}>
              {index === 0 ? (
                <Typography style={{textAlign: "center",}}> Genesis </Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableCell align="center" style={{fontSize: 13}}>Hash</TableCell>
                    <TableCell align="center" style={{fontSize: 13}}>From</TableCell>
                    <TableCell align="center" style={{fontSize: 13}}>To</TableCell>
                    <TableCell align="center" style={{fontSize: 13}}>Value</TableCell>
                  </TableHead>
                  <TableBody>
                    {
                      transactions.map((transaction, index)=>{
                        return (
                            <TableRow key={index}>
                              <TableCell align="center">
                                <PopupValue value={transaction.signature} />
                              </TableCell>
                              <TableCell align="center">
                                <PopupValue value={transaction.fromAdd} />
                              </TableCell>
                              <TableCell align="center">
                                <PopupValue value={transaction.toAdd}/>
                              </TableCell>
                              <TableCell align="center">
                                <Typography style={{ fontSize: 11, width: "150px" }}>
                                  {transaction.amount}
                                </Typography>
                              </TableCell>
                            </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Blocks);
