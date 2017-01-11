import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import s from 'underscore.string'
import _ from 'underscore'

import { Timestampable } from '../common/schemas'

const UserProfile = new SimpleSchema({

  name: {
    type: String,
    optional: true,
    autoValue() {
      const firstName = this.siblingField('firstName')
      const surName = this.siblingField('surName')
      if (!this.value && firstName.value && surName.value) {
        return `${firstName.value} ${surName.value}`
      }
    }
  },
  firstName: {
    type: String,
    optional: true,
    autoValue() {
      const name = this.siblingField('name')
      if (!this.value && name.value) {
        return s.words(name.value)[0]
      }
    }
  },
  surName: {
    type: String,
    optional: true,
    autoValue() {
      const name = this.siblingField('name')
      if (!this.value && name.value) {
        return s.words(name.value).slice(1).join(' ')
      }
    }
  },


})


const User = new SimpleSchema([
  Timestampable,
  {
    profile: {
      type: UserProfile,
      optional: true
    },
    username: {
      type: String,
      optional: true,
      autoValue() {
        if (this.value && this.isSet) {
          return s.slugify(this.value)
        }
      }
    },
    emails: {
      type: [Object],
      optional: true
    },
    'emails.$.address': {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    'emails.$.verified': {
      type: Boolean,
      optional: true,
      defaultValue: false
    },
    services: {
      type: Object,
      optional: true,
      blackbox: true
    },
    roles: {
      type: [String],
      optional: true
    }

  }
])

export {
  User
}
