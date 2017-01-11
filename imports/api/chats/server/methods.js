import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { _ } from 'meteor/underscore'
import { Roles } from 'meteor/alanning:roles'
import Chats from '../chats'

Meteor.methods({
  addChatMessage(msg, roomId) {
    check(msg, String)
    check(roomId, String)
    const fromId = this.userId
    return Chats.insert({msg, roomId})
  }

})
