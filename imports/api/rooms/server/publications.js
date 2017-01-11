/* eslint prefer-arrow-callback: 0 */
import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { _ } from 'meteor/underscore'
import { Roles } from 'meteor/alanning:roles'

import Rooms from '../rooms'

Meteor.publish('rooms', function adminPosts(selector = {}, options = {}) {
  check(selector, Object)
  check(options, Object)

  _.defaults(options, {
    sort: {
      createdAt: -1
    }
  })
  return Rooms.find(selector, options)
})
