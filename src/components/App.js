import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from './Login'
import Header from './Header'
import * as AllActions from '../actions'

class App extends Component{
 
  render() {
    const { user } = this.props;
    if(user.loggedIn){
        return(    
          <div>
          <Header user={user}  logOut={this.props.actions.logOut} ></Header>
          </div>
        )
     
    }else{
      return (
        <div>
        <Login user={user} loginUser={this.props.actions.loginUser} LoginValidate={this.props.actions.LoginValidate} />
        </div>
          );
     }
     
  }
}
App.propTypes = {
  actions: PropTypes.object.isRequired,
  user:  PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  user: state.user,
  page:state.page
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AllActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps) (App);
