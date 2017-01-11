import React from 'react'
import { Meteor } from 'meteor/meteor'
import { AccountsTemplates } from 'meteor/useraccounts:core'
import { FlowRouter } from 'meteor/kadira:flow-router'

const Header = (props, context) => (
  <div className="header-wrapper">
    <h1><a href={FlowRouter.path('roomList')}>Chat App</a></h1>
    { Meteor.userId() ?
      (<a href="#" className="login" onClick={() => AccountsTemplates.logout()}>Logout</a>) : ('')
    }
  </div>
)

export default Header

