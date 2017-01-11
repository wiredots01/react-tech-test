import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { Timestampable, Owner } from '../common/schemas'

const Chat = new SimpleSchema([
  Owner, Timestampable,
  {
    msg: {
      type: String
    },
    roomId: {
      type: String
    }
  }
])

export {
  Chat
}
