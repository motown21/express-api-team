// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for teams
const Team = require('../models/team')

// this is a collnom ection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { team: { title: '', text: 'foo' } } -> { team: { text: 'foo' } }

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /teams
router.get('/teams', requireToken, (req, res, next) => {
  Team.find({ owner: req.user._id })
    .then(teams => {
      // `teams` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return teams.map(team => team.toObject())
    })
    // respond with status 200 and JSON of the teams
    .then(teams => res.status(200).json({ teams: teams }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// // SHOW
// // GET /teams/5a7db6c74d55bc51bdf39793
// router.get('/teams/:id', requireToken, (req, res, next) => {
//   // req.params.id will be set based on the `:id` in the route
//   Team.findOne({ _id: req.params.id, owner: req.user._id })
//     .then(handle404)
//     // if `findById` is succesful, respond with 200 and "team" JSON
//     .then(team => res.status(200).json({ team: team.toObject() }))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

// CREATE
// POST /teams
router.post('/teams', requireToken, (req, res, next) => {
  // set owner of new team to be current user
  req.body.team.owner = req.user.id
  const teamData = req.body.team

  Team.create(teamData)
    // respond to succesful `create` with status 201 and JSON of new "team"
    .then(team => {
      res.status(201).json({ team: team.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /teams/5a7db6c74d55bc51bdf39793
router.patch('/teams/:id', requireToken, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.team.owner
  console.log('id is' + req.params.id)
  console.log('Owner is' + req.user._id)
  // Team.find({id: req.params.id, owner: req.user._id})
  Team.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body.team)
    .then(handle404)
  // .then(team => {
  //   // pass the `req` object and the Mongoose record to `requireOwnership`
  //   // it will throw an error if the current user isn't the owner
  //   // requireOwnership(req, team)

    //   // pass the result of Mongoose's `.update` to the next `.then`
    //   return team.update(req.body.team)
    // })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /teams/5a7db6c74d55bc51bdf39793
router.delete('/teams/:id', requireToken, (req, res, next) => {
  console.log('id is' + req.params.id)
  console.log('Owner is' + req.user._id)
  Team.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    .then(handle404)
    // .then(team => {
    //   // throw an error if current user doesn't own `team`
    //   requireOwnership(req, team)
    //   // delete the team ONLY IF the above didn't throw
    //   team.findOneAndDelete()
    // })
    // // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
