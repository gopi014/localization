import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Material Styles
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import Grow from 'material-ui/transitions/Grow';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';



const styles = theme => ({
    root: {
        width: '100%',
    },
    cvdata:{
        marginLeft:'10px',
        marginRight:'10px'

    },
    flex: {
        flex: 1,
        marginLeft:'700px'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        background: "#50C0F2",
        minHeight: 50
    },
    username: {
        fontSize: 16,
        padding: 8,
        marginRight: 20
    },

    popperClose: {
        pointerEvents: 'none',
    },
    card: {
        minWidth: 240,
        backgroundColor: '#232732',
        height: 80
    },
    popperTitle: {
        color: '#50c0f2',
        textSize: 16
    },
    button: {
        background: 'none',
        border: '1px solid #50C0F2',
        color: '#50c0f2',
        borderRadius: '1px',
        textTransform: 'none',
        fontSize: '14px',
        float: 'right',
        marginRight: 10
    },
    table: {
        minWidth: 700,
    }
});

const initialState = {
    popperOpen: false,
};


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handlePopperOpen = () => {
        this.setState({ popperOpen: true });
    };

    handlePopperClose = () => {
        this.setState({ popperOpen: false });
    };
    handleLogout = () => {
        this.props.logOut();
    }



    render() {
        const { user, classes } = this.props;
        const username = user.username;
        const email = user.email;
        const empId = user.empId;
        const { popperOpen } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classNames(classes.appBar)}>
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            CV Validator
                        </Typography>
                        {/* <Avatar src={require('../images/DSC_0190.jpg')} */}
                        <Avatar src={'https://faces.tap.ibm.com/imagesrv/' + empId}

                        />
                        <Manager onMouseOut={this.handlePopperClose}>
                            <Target >
                                <Typography type="title" color="inherit" onMouseOver={this.handlePopperOpen}
                                    className={classes.username}>
                                    {username}
                                </Typography>
                            </Target>
                            <Popper
                                placement="bottom-start"
                                eventsEnabled={popperOpen}
                                className={!popperOpen ? classes.popperClose : ''}
                                onMouseOver={this.handlePopperOpen}
                            >
                                <Grow in={popperOpen} style={{ transformOrigin: '0 0 0' }}>
                                    <Card className={classes.card} >
                                        <CardContent>
                                            <Typography className={classes.popperTitle}>{email}</Typography>
                                            <Button raised color="primary" onClick={this.handleLogout.bind(this)} className={classes.button}>
                                                LogOut
                                             </Button>
                                        </CardContent>
                                        <CardActions>
                                        </CardActions>
                                    </Card>
                                </Grow>
                            </Popper>
                        </Manager>
                    </Toolbar>
                </AppBar>
                <div style={{marginTop:'100px'}} className={classes.cvdata}>
				</div>
            </div>
        )
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Header);