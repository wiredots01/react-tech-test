/* global Bert, saveAs, Blob */
import { Meteor } from 'meteor/meteor'
import React from 'react'

export default class ChatForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleKeyEnter = this.handleKeyEnter.bind(this)
    this.handleKeySubmit = this.handleKeySubmit.bind(this)
    this.state = {

    }
  }

  handleKeyEnter(e) {
    const { gotoBottom, roomId } = this.props
    if (e.charCode == 13 || e.keyCode == 13 ) {
      const msg = e.target.value
      Meteor.call('addChatMessage', msg, roomId)
      e.target.value = ''
      gotoBottom()
    }
  }

  handleKeySubmit() {
    const { gotoBottom, roomId } = this.props

    if(this.textInput.value !== ''){
      Meteor.call('addChatMessage', this.textInput.value, roomId)
      this.textInput.value = ''
      gotoBottom()
    }
  }

  render() {
    return (
      <div className="message-wrapper">
        <input ref={(input) => { this.textInput = input }} onKeyPress={this.handleKeyEnter} rows="1" placeholder="Start a new message" />
        <button onClick={this.handleKeySubmit}>Send</button>
      </div>
    )
  }
}

ChatForm.propTypes = {
  roomId: React.PropTypes.string,
  gotoBottom: React.PropTypes.func
}
