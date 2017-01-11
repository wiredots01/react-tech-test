import { Meteor } from 'meteor/meteor'
import { AccountsTemplates } from 'meteor/useraccounts:core'
import { FlowRouter } from 'meteor/kadira:flow-router'

AccountsTemplates.configure({
  onLogoutHook() {
    Meteor.isClient
    return FlowRouter.go('home')
  },
  onSubmitHook(err, state) {
    if (!err) {
      if (state === 'signIn') {
        Meteor.isClient
        FlowRouter.go('roomList')
      } else if (state === 'signUp') {
        Meteor.isClient
        FlowRouter.go('roomList')
      }
    }
  }
})
