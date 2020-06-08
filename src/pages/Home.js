import React from "react";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Card, CardContent, Button, Divider, Paper, InputBase} from "@material-ui/core";
import keyGeneration from "../services/key-generation";
import {Link} from "react-router-dom";

class Home extends React.Component{
    state = {
        users: [],
    };

    componentDidMount() {
        if(localStorage.getItem('users')!==null){
            this.setState({
                users: JSON.parse( localStorage.getItem('users'))
            })
        }
    }

    createUser=()=>{
        const {users}= this.state;
        const array = [...users];
        const generateKey = new keyGeneration();
        array.push({publicKey: generateKey.publicKey,privateKey: generateKey.privateKey ,id: array.length});

        this.setState({
            users: [...array]
        });
        localStorage.setItem('users', JSON.stringify(array))
    };

    render() {
        const {classes} = this.props;
        const {users} = this.state;
        return(
            <Grid container direction="column" alignItems="center" justify="center" className={classes.root}>
                <Typography className={classes.sub_brand}>WELCOME TO JOIN</Typography>
                <Typography className={classes.brand}>BLOCKCHAIN</Typography>
                <Grid container direction="column" justify="center" alignItems="center" style={{marginTop: '5%'}}>
                    {users.map((user, index)=>{
                        return (
                            <Card variant="outlined" className={classes.cardUser} key={index}>
                                <Grid container direction="column" justify="center" alignItems="center" >
                                    <Typography className={classes.titleUser}>User #{index}</Typography>
                                    <Divider style={{width: '100%'}}/>
                                    <CardContent className={classes.containerUser}>
                                        <Paper
                                            component="form"
                                            className={classes.paper}
                                            variant="outlined"
                                        >
                                            <Typography className={classes.typo}>Address</Typography>
                                            <InputBase className={classes.input} value={user.publicKey}/>
                                        </Paper>
                                    </CardContent>
                                    <Link to={`/${user.publicKey}/detail`}>
                                        <Button className={classes.buttonStart}>Let's start</Button>
                                    </Link>
                                </Grid>
                            </Card>

                        )
                    })}
                    <Button className={classes.buttonAddPeer} onClick={this.createUser}>Add peer</Button>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Home)
