import React, { Component } from 'react';

import PropTypes from 'prop-types'
// Material Styles
import { withStyles } from 'material-ui/styles';

// Material design components
// import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
// Constants
import { EMAIL_REQUIRED, PASSWORD_REQUIRED, EMAIL_VALIDATE_ERROR } from '../constants/LoginActionTypes'
const logo = require('../images/user.png')
const styles = theme => ({
    cvHeading: {
        color: '#ffffff',
        // fontWeight: 'bold',
        // fontFamily: 'Liberation Mono',
        fontSize: '10px',
        marginBottom: '1%'
        },
    welcomeText: {
       color: '#ffffff',
       fontSize: '25px',
       marginTop: '5%'
       },
    root: {
        textAlign: 'center',
        height:'660px',
        background:'#333333',
        padding:'100px'
        },
    heading: {
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: '1px',
        width: '250px',
        height: '70px',
        margin: 'auto',
        background:'#333333'
            },
    loginDiv: {
        background: '#404040',
        marginTop: '5%',
        marginLeft: '30%',
        // paddingLeft: '10%'
        width: '40%',
        height: '340px'
    },
    round: {
        height: 50,
        width: 50,
        margin: 20,

        display: 'inline-block',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#808080',
    },
    formControl: {
        width: '80%'
    },
    headLine: {
        color: '#80ffaa',
        fontSize: '20px',
    },
    userIcon: {
        color: '#1565C0'
    },
    input:{
        color:'#ffffff',
        borderColor: '#ffffff',
        fontSize:12
    },
    mainDiv: {
        width: '100%',
        marginTop: '4%',
        // marginLeft:'-25px'
    },
    remPassword:{
        display: 'inline-block',
        width: '80%',
        marginLeft:'-100px'
    },
    chkLabel: {
        fontSize: '14px',
        color: '#808080'
    },
    signUp: {
        display: 'inline-block',
        color: '#808080',
        // marginLeft:'30px'
    },
    signupButton:{
        textTransform: 'none',
        fontSize: '14px',
        color: '#80ffaa',
        background: 'transparent',
        border:'none',
        boxShadow:'none',
        '&:hover' :{
            background: 'transparent',
        }
        },
    button: {
        marginTop: '5%',
        background: '#78C893',
        width: '100%',
        height:'50px',
        color: '#ffffff',
        fontSize: '14px',
        '&:hover' :{
            background: '#78C893',
        }
    },
    ref: {
        color: '#1565C0',
        textTransform: 'none',
        width: '60%'
    },
    snackbar: {
        background: 'red'
    },
    inputBottom:{
        color:'white',
        fontSize:12,
        '&:after': {
            backgroundColor:'white',
          },
        '&:before':{
            backgroundColor:'white'
        }
    }

});

const initialState = {
    email: "",
    completed: 0
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleLogin() {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        if (email.length === 0) {
            this.props.LoginValidate({ error: true, errorMessage: EMAIL_REQUIRED });
        } else if (!this.validateEmail(email)) {
            this.props.LoginValidate({ error: true, errorMessage: EMAIL_VALIDATE_ERROR })
        } else if (password.length === 0) {
            this.props.LoginValidate({ error: true, errorMessage: PASSWORD_REQUIRED })
        } else if (email && password) {
            this.props.LoginValidate({ error: false, errorMessage: "" })
            this.setState({ completed: 0 });
            this.props.loginUser(email, password);
            this.timer = setInterval(this.progress, 200);
        }
    }

    progress = () => {
        const { completed } = this.state;
        if (completed > 100) {
            this.setState({ completed: 0 });
        } else {
            const diff = Math.random() * 20;
            this.setState({ completed: completed + diff });
        }
    };
    componentWillUnmount = () => {
        clearInterval(this.timer);
    }
    validateEmail = (email) => {
        if (email.length > 0) {
            // eslint-disable-next-line
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let status = re.test(email);
            return status;
        }
        return false;
    }

    validateEmailWithErrorMessage = (email) => {
        if (email.length > 0) {
            let status = this.validateEmail(email);
            return !status ? EMAIL_VALIDATE_ERROR : "";
        }
        return "";
    }
    handleClose = () => {
        this.props.LoginValidate({ error: false, errorMessage: "" });
    };
    render() {
        const { classes } = this.props;
        const { error, loggingIn } = this.props.user;
        return (
            <div className={classes.root}>
                {/* {!loggingIn && clearInterval(this.timer)} */}
                {loggingIn && <LinearProgress mode="determinate" value={this.state.completed} />}
                <Paper className={classes.heading}>
                    <Typography type="display1" component='h3' className={classes.welcomeText}>
                        LOCALISATION
                    </Typography>
                    <Typography className={classes.cvHeading} type="display4" component='h2' >
                        YOUR TAGLINE GOES HERE
                    </Typography>
                </Paper> 
                <Paper className={classes.loginDiv}>
                    <Avatar src={logo} className={classes.round}>
                    </Avatar>
                    <Typography type="display1" component="h3" className={classes.headLine}>
                        LOGIN
                    </Typography>
                    <FormControl className={classes.formControl} >
                        <InputLabel htmlFor="email"  className={classes.input}>Username</InputLabel>
                        <Input
                            id="email" className={classes.inputBottom}
                            value={this.state.email}
                            onChange={event => this.setState({ email: event.target.value })}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="password" className={classes.input}>Password</InputLabel>
                        <Input
                            id="password"
                            className={classes.inputBottom}
                            type='password'
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })}
                        />
                    </FormControl>
                        <div className={classes.mainDiv}>
                            <div className={classes.remPassword}>
                                <input type="checkbox" id={this.id} />
                                <label className={classes.chkLabel} htmlFor={this.id}>Remember Password</label>
                            </div>
                            <div className={classes.signUp}>
                                <Button raised color="primary" className={classes.signupButton} >
                                    Sign up here!
                                </Button>
                            </div>
                        </div>
                    <Button raised color="primary" className={classes.button} onClick={this.handleLogin.bind(this)}>
                        Sign In
                    </Button>
                </Paper>
                <Snackbar SnackbarContentProps={{
                            classes: {
                                  root: classes.snackbar
                            }
                        }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={error.error}
                            onClose={this.handleClose}
                            autoHideDuration={1500}
                            message={error.errorMessage}
                        />
                        {/* </div> */}
                
                {/* </div> */}
            
            </div>
        )
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    LoginValidate: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


export default withStyles(styles)(Login);