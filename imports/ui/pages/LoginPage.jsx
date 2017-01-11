import { Meteor } from 'meteor/meteor'
import React from 'react'
import Blaze from 'meteor/gadicc:blaze-react-component'
import { FlowRouter } from 'meteor/kadira:flow-router'

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin(e) {
    e.preventDefault();
    const username = e.target.username.value
    const password = e.target.password.value
    Meteor.loginWithPassword(username, password, (error) => {
      if (!error) {
        Bert.alert('Welcome!', 'success', 'fixed-top', 'fa-smile-o')
        FlowRouter.go('roomList');
      } else {
        Bert.alert(error.message, 'danger', 'fixed-top', 'fa-frown-o')
      }
    });
    console.log('test')
  }
  render() {
    return (
      <div className="login-wrapper">
        <div className="row">
          <div className="col-sm-3" />
          <div className="col-sm-6">
            <form className="form form-validate" onSubmit={this.handleLogin} id="login_form">
              <div className="form-group" >
                <input type="text" className="form-control required" id="username" name="username" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-group" >
                <input type="password" className="form-control required" id="password" name="password" />
                <label htmlFor="password">Password</label>
              </div>
              <br/>
              <div className="row">
                <div className="col-xs-12 text-right">
                  <button className="btn btn-block btn-primary btn-raised" type="submit">Login</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-3" />
        </div>
      </div>
    )
  }
}

LoginPage.contextTypes = {
  currentUser: React.PropTypes.object
}
