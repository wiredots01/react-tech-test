import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { _ } from 'meteor/underscore'
import { Roles } from 'meteor/alanning:roles'
import Rooms from '../rooms'

Meteor.methods({
  addRoom(name) {
    check(name, String)
    return Rooms.insert({name})
  }

})
