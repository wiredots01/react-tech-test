import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import { FlowRouter } from 'meteor/kadira:flow-router'

import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Rooms from '/imports/api/rooms/rooms'


class RoomList extends React.Component {
  render() {
    const { rooms } = this.props
    return (
      <div>
        <div className="user-list">
          { rooms && rooms.map((room) => (
            <div className="user-box" key={room._id}>
              <a href={FlowRouter.path('singleRoom', { roomId: room._id })}><span></span></a>
              <a href={FlowRouter.path('singleRoom', { roomId: room._id })}>{room.name}</a>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

RoomList.propTypes = {
  rooms: React.PropTypes.array
}

RoomList.contextTypes = {
  currentUser: React.PropTypes.object
}

export default createContainer(() => {
  Meteor.subscribe('rooms')
  const rooms = Rooms.find().fetch()

  return {
    rooms
  }
}, RoomList)
