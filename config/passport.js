const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('123')
    User.findOne({ email })
    .then(user => {
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'That email is not registered!' })
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Email or Password incorrect.' })
      }
      return done(null, user)
    })
    .catch(err => console.log(err))
  }))

    passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    console.log(user)
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
