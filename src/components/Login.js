import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Material Styles
import { withStyles } from 'material-ui/styles';

// Material design components
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PermIdentity from 'material-ui-icons/PermIdentity';
import LockOutline from 'material-ui-icons/LockOutline';
import ArrowForward from 'material-ui-icons/ArrowForward';
import {FormControl} from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';

// Constants
import { EMAIL_REQUIRED, PASSWORD_REQUIRED, EMAIL_VALIDATE_ERROR } from '../constants/LoginActionTypes'

const styles = theme => ({
    cvHeading: {
        color: '#1565C0',
        fontWeight: 'bold',
        fontFamily: 'Liberation Mono',
        fontSize:'50px'
    },
    root: {
        textAlign: 'center'
    },
    rightGrid: {
        background: '#F5F5F5',
        height: '100vh',
        textAlign: 'left',
        margin: '0'
    },
    loginDiv: {
        color: '#1565C0',
        marginTop: '25%',
        paddingLeft: '10%'
    },
    formControl: {
        width: '60%'
    },
    headLine: {
        color: '#1565C0',
        paddingBottom: '5%',
        fontFamily: 'verdana'
    },
    userIcon: {
        color: '#1565C0'
    },
    button: {
        marginTop: '5%',
        background: '#1565C0',
        width: '60%',
        borderRadius: '4px',
        textTransform: 'none',
        fontSize: '19px'
    },
    ref:{
        color:'#1565C0',
        textTransform: 'none',
        width: '60%'
    },
    snackbar:{
        background:'red'
    }

});

const initialState = {
    email: "",
    completed:0
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
                this.props.LoginValidate({ error: true, errorMessage:EMAIL_REQUIRED});
            } else if (!this.validateEmail(email)) {
                this.props.LoginValidate({ error: true, errorMessage: EMAIL_VALIDATE_ERROR})
            } else if (password.length === 0) {
                 this.props.LoginValidate({ error: true, errorMessage: PASSWORD_REQUIRED})
            }  else if (email && password) {
                this.props.LoginValidate({ error: false, errorMessage: ""})
                this.setState({ completed: 0 });
               this.props.loginUser(email,password);
               this.timer = setInterval(this.progress, 200);
            }
         }

         progress = () => {
            const { completed } = this.state;
            if (completed > 100) {
                this.setState({ completed: 0});
            } else {
              const diff = Math.random() * 20;
              this.setState({ completed: completed + diff });
            }
          };
          componentWillUnmount=()=>{
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
             return !status ? EMAIL_VALIDATE_ERROR :  "";
           }
           return "";
         }
         handleClose = () => {
            this.props.LoginValidate({ error: false,errorMessage:"" });
          };
    render()
          {    
            const { classes } = this.props;
            const {error,loggingIn}=this.props.user;
    return (
        <div>
       {/* {!loggingIn && clearInterval(this.timer)} */}
       {loggingIn && <LinearProgress mode="determinate" value={this.state.completed} />}
        <Grid container className={classes.root} spacing={0} alignItems={'center'}>
            <Grid item xs >
                <Typography type="display1" component='h3' className={classes.welcomeText}>
                    Welcome to
                </Typography>
                <Typography className={classes.cvHeading} type="display4" component='h2' >
                CV Validator
                </Typography>

            </Grid>
            <Grid item xs className={classes.rightGrid} >
                <div className={classes.loginDiv}>
                    <Typography type="display1" component="h3" className={classes.headLine}>
                        Login
                    </Typography>
                    <FormControl className={classes.formControl} >
                        <InputLabel htmlFor="email">W3 ID</InputLabel>
                        <Input
                            id="email" className={classes.input}
                            value={this.state.email}
                            onChange={event => this.setState({ email: event.target.value })}
                            endAdornment={<InputAdornment position="end">
                                <PermIdentity className={classes.userIcon}></PermIdentity>
                            </InputAdornment>}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password" className={classes.input}
                            type='password'
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <LockOutline className={classes.userIcon}></LockOutline>
                                </InputAdornment>
                            }
                        />
                    </FormControl>


                    <Button raised color="primary" className={classes.button} onClick={this.handleLogin.bind(this)}>
                        Sign In <ArrowForward></ArrowForward>
                    </Button>

                </div>
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
            </Grid>
        </Grid>
        </div>
    )
}
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    LoginValidate:PropTypes.func.isRequired,
    user:  PropTypes.object.isRequired
}
// const mapStateToProps = state => ({
//     user: state.user
//   })

export default  withStyles(styles)(Login);