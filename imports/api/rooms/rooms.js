import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import s from 'underscore.string'

import { Room } from './schema'

class RoomsCollection extends Mongo.Collection {

}

const Rooms = new RoomsCollection('rooms')

Rooms.attachSchema(Room)

Rooms.helpers({
  author() {
    return Meteor.users.findOne(this.owner)
  }
})

export default Rooms
