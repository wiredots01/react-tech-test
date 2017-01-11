import React from 'react'
import { mount } from 'react-mounter'

import { FlowRouter } from 'meteor/kadira:flow-router'

import { PageLayout, UserLayout } from '/imports/ui/layouts/'

import HomePage from '/imports/ui/pages/HomePage.jsx'
import LoginPage from '/imports/ui/pages/LoginPage.jsx'
import RoomList from '/imports/ui/components/chat/RoomList.jsx'
import ChatList from '/imports/ui/components/chat/ChatList.jsx'

import NotFoundPage from '/imports/ui/pages/NotFoundPage.jsx'

import ChatContainer from '/imports/ui/containers/chat/ChatView.jsx'

import { nonAuthenticated, ensureUserLoggedIn } from './hooks'

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(PageLayout, {
      content: <HomePage />
    })
  },
  triggersEnter: [ensureUserLoggedIn]
})

FlowRouter.route('/login', {
  name: 'login',
  action() {
    mount(UserLayout, {
      content: <LoginPage />
    })
  },
  triggersEnter: [nonAuthenticated]
})

FlowRouter.route('/room/:roomId', {
  name: 'singleRoom',
  action(params) {
    mount(UserLayout, {
      content: <ChatContainer component={ChatList} {...params} />
    })
  },
  triggersEnter: [ensureUserLoggedIn]
})


FlowRouter.route('/chat/:toId', {
  name: 'singleChat',
  action(params) {
    mount(UserLayout, {
      content: <ChatContainer component={ChatList} {...params} />
    })
  },
  triggersEnter: [ensureUserLoggedIn]
})

FlowRouter.route('/rooms', {
  name: 'roomList',
  action() {
    mount(UserLayout, {
      content: <RoomList />
    })
  },
  triggersEnter: [ensureUserLoggedIn]
})

FlowRouter.notfound = {
  action() {
    mount(NotFoundPage)
  }
}

