import React, { Component } from 'react'
import PropTypes from 'prop-types';
// Material Styles
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
// import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
// import { Manager, Target, Popper } from 'react-popper';
// import Grow from 'material-ui/transitions/Grow';
// import Card, { CardActions, CardContent } from 'material-ui/Card';
// import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import {drawerMenuOptions} from '../data/data'
import Dashboard from './Dashboard';

const styles = theme => ({
    root: {
        textAlign: 'center',
        background: '#212121',
        padding: '100px',
        overflow: 'none',
        height: '69.8vh'
    },
    flex: {
        flex: 1,
        marginRight: 20,
        color: '#78C893',
        fontSize: 14,
        textAlign: 'right'
    },
    icon: {
        fontSize: 40
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    userImage: {

    },
    appBar: {
        background: "#2B2B2B",
        height: '8vh',
        width: '80%',
        marginRight:3
    },
    username: {
        fontSize: 12,
        padding: 8,
        marginRight: 20,
        color: '#78C893'
    },
    drawerPaper: {
        position: 'fixed',
        width: '267px',
        background:'#78C893',
   },
    cvHeading: {
        color: '#F3FFF7',
        // fontWeight: 'bold',
        // fontFamily: 'Liberation Mono',
        fontSize: '10px',
        marginBottom: '1%'
    },
    welcomeText: {
            color: '#F3FFF7',
            fontSize: '16px',
            marginTop: '5%'
    },
    heading: {
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: '1px',
        width: '160px',
        height: '50px',
        margin: 'auto',
        background:'transparent',
        boxShadow:'none',
        marginTop:15
    },
    menuPaper:{
        background:'transparent',
        boxShadow:'none',
        marginTop:30
    },
    menuOptiontext:{
        textAlign:'left',
        color:'#F3FFF7'
    },
    selected:{
        background:'#212121',
        '&:hover' :{
            background: '#212121',
        }
    },
    content:{
        marginLeft:220,
        marginTop:-20,
        width:'80%',
    },
    title:{
        textAlign:'left',
    }
});

const initialState = {
index:0
};


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleLogout = () => {
        this.props.logOut();
    };
    handleClickListItem = (index) => {  
          this.setState({index:index});
    };

    render() {
        const { user, classes } = this.props;
        const username = user.username;
        // const logo = require('../images/user.png');
        const mainMenuListItems = (
            <div>
              {drawerMenuOptions.map((option,index) =>
                <ListItem button  key={option.title} className={index===this.state.index? classes.selected:""} onClick={()=>{this.handleClickListItem(index)}}>
                    <ListItemIcon>
                    <Icon className={classes.menuOptiontext}>
                       {option.iconName}
                    </Icon>
                    </ListItemIcon>
                    <ListItemText  primary={<Typography  className={classes.menuOptiontext}>{option.title}</Typography>}/>
                </ListItem>
                )}
            </div>
          );
    
        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classNames(classes.appBar)}>
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Welcome {username}
                        </Typography>

                        <Icon className={classes.icon}>account_circle</Icon>

                    </Toolbar>
                </AppBar>
                <Drawer
                    type="persistent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={true}
                >
                    <div className={classes.toolbar}>
                    <Paper className={classes.heading}>
                    <Typography type="display1" component='h3' className={classes.welcomeText}>
                        LOCALISATION
                    </Typography>
                    <Typography className={classes.cvHeading} type="display4" component='h2' >
                        YOUR TAGLINE GOES HERE
                    </Typography>
                </Paper> 
                <Paper className={classes.menuPaper}>
                    {mainMenuListItems}
                    </Paper>
                   </div>
                </Drawer>
                <div className={classes.content}>
                    {this.state.index===0 && <Dashboard/>}
                </div> 
            </div>
            
        )
    }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired
}

  export default withStyles(styles)(Header);