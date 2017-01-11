/* eslint prefer-arrow-callback: 0 */
import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { _ } from 'meteor/underscore'
import { Roles } from 'meteor/alanning:roles'

import Chats from '../chats'


Meteor.publishComposite('roomChat', function roomChat(roomId) {
  check(roomId, String)
  const fromId = this.userId
  return {
    find() {
      return Chats.find({roomId})
    },
    children: [
      {
        find(chat) {
          return Meteor.users.find({ _id: chat.owner }, {
            fields: Meteor.users.publicFields
          })
        }
      }
    ]
  }
})
