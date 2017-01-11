// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import { xml2js } from 'meteor/peerlibrary:xml2js'
import _ from 'underscore'


import Rooms from '/imports/api/rooms/rooms'

const createtestAccount = () => {
  Accounts.createUser({
    email: 'client@test.com',
    password: 'querty123'
  });

  Accounts.createUser({
    email: 'client2@test.com',
    password: 'querty123'
  });

}

const createDefaultUsers = () => {

  HTTP.call('GET', "https://testapi.react.technology/users/?email=me@jacquesblom.com,hello@jqh.co.za", {},
    (xmlError, xmlResponse) => {
      if(xmlError){
        console.error('xmlError', xmlError);
      }else{
        xml2js.parseString(xmlResponse.content, {explicitArray:false, emptyTag:undefined}, (jsError, jsResult) => {
          if(jsError){
            console.error('xml2js error',jsError);
          }else{
            _.each(jsResult.Users.User, (user) => {
              let emailAdd = user.Email
              if (user.Email === 'me@jacquesblom.com') { emailAdd = 'wiredots@gmail.com' }
              if (user.Email === 'hello@jqh.co.za') { emailAdd = 'wiredots01@yahoo.com.ph' }

              const userAccount = Meteor.users.findOne({ 'emails.address': emailAdd })
              if (!userAccount) {
                Accounts.createUser({
                  email: emailAdd,
                  profile: {
                      firstName: user.Name,
                      surName: user.Surname
                  }
                })
              }
            })
          }
        })
      }

  })
}

const setupAdminUsers = () => {
  _.each(['wiredots@gmail.com', 'wiredots01@yahoo.com.ph'], (email) => {
    const user = Meteor.users.findOne({ 'emails.address': email })
    if (user) {
      if (user.roles) {
        Roles.addUsersToRoles(user, 'admin')
      } else {
        Roles.setUserRoles(user, 'admin')
      }
    }
  })
}

const createRooms = () => {
  if (Rooms.find().count() === 0) {
    const data = [
      { name: 'React' },
      { name: 'Meteor' },
      { name: 'Node' },
      { name: 'Mongo' }
    ];

    data.forEach(room => Rooms.insert(room));
  }
}

Meteor.startup(() => {
  // createtestAccount()
  createRooms()
  createDefaultUsers()
  setupAdminUsers()
});
