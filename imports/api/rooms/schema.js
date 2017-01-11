import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Timestampable, Owner } from '../common/schemas'

const Room = new SimpleSchema([
  Timestampable,
  {
    name: {
      type: String
    }
  }
])

export {
  Room
}
