import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import HourglassEmptyRoundedIcon from "@material-ui/icons/HourglassEmptyRounded";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { Link, useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Mining from "../../pages/Minning";
import NewTransaction from "../../pages/Transaction";
import Slide from '@material-ui/core/Slide';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import Popover from "@material-ui/core/Popover/Popover";
import Box from "@material-ui/core/Box";
import {InputBase, Paper} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: "#ffffff"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  brand: {
    textTransform: "uppercase",
    background: "-webkit-linear-gradient(45deg,#d4145a,#fbb03b)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontWeight: "bold",
    textDecoration: "none"
  },
  button: {
    borderRadius: 50,
    width: 150,
    height: 40,
    marginLeft: 10,
    background: "-webkit-linear-gradient(45deg,#d4145a,#fbb03b)",
    color: "#fff",
    "&:hover": {
      background: "-webkit-linear-gradient(45deg,#d4145a,#fbb03b)",
      color: "#fff"
    }
  },
  titleMining: {
    color: "#d4145a",
    fontFamily: "Merriweather"
  },
    titleNewTransaction: {
        color: "#d4145a",
        fontFamily: "Merriweather"
    },
  paper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
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
  valueMining: {
    fontSize: 11,
    width: "400px"
  },
  input_hash: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 12,
    color: "green"
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
                    width: "400px",
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

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function Navbar(props) {
  const classes = useStyles();
  const {blockchain} = props;
  let { id } = useParams();
  const [openSpending, setOpenSpending] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [openHistory, setOpenHistory] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleClickOpenSpending = () => {
      setOpenSpending(true);
  };
  const handleCloseSpending = () => {
      setOpenSpending(false);
  };

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };
    const handleCloseNew = () => {
        setOpenNew(false);
    };

  const handleClickOpenHistory = () => {
    setOpenHistory(true);
  };
  const handleCloseHistory = () => {
    setOpenHistory(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Link to="/">
                <Typography variant="h5" className={classes.brand}>
                  Blockchain
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button className={classes.button} onClick={handleClickOpenHistory}>
                  <CompareArrowsIcon fontSize={"small"} />
                  Transactions
                </Button>

                <Button className={classes.button} onClick={handleClickOpenSpending}>
                  <HourglassEmptyRoundedIcon fontSize={"small"} />
                  Spending
                </Button>

                <Button className={classes.button} onClick={handleClickOpenNew}>
                  <AddIcon fontSize={"small"} />
                  New
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Dialog
        onClose={handleCloseSpending}
        aria-labelledby="customized-dialog-title"
        open={openSpending}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseSpending}>
          <Typography variant="h6" className={classes.titleMining}>
            Spending transactions
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Mining id={id} blockchain={blockchain} />
        </DialogContent>
      </Dialog>
        <Dialog
            onClose={handleCloseNew}
            aria-labelledby="customized-dialog-title"
            open={openNew}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id="customized-dialog-title" onClose={handleCloseNew}>
                <Typography variant="h6" className={classes.titleNewTransaction}>
                    New transaction
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <NewTransaction id={id} blockchain={blockchain}/>
            </DialogContent>
        </Dialog>

      <Dialog fullScreen open={openHistory} onClose={handleCloseHistory} TransitionComponent={Transition}>
        <Toolbar style={{background: '#f26d85', color: '#ffffff'}}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <IconButton edge="start" color="inherit" onClick={handleCloseHistory} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Transactions
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Paper
                  component="form"
                  className={classes.paper}
                  variant="outlined"
              >
                <Typography className={classes.typo}>Address</Typography>
                <InputBase className={classes.input_hash}  value={value} onChange={handleChange}/>
              </Paper>
            </Grid>
          </Grid>
        </Toolbar>
        <DialogContent>
          <Table>
            <TableHead>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableHead>
            <TableBody>
              {value?blockchain.getTransOfAddress(value).map((transaction, index) => {
                return (
                    <TableRow key={index}>
                      <TableCell align="center">{index}</TableCell>
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
              }): blockchain.getAllTransactions().map((transaction, index) => {
                return (
                    <TableRow key={index}>
                      <TableCell align="center">{index}</TableCell>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
