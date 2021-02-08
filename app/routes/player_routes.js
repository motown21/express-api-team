const express = require('express')
const passport = require('passport')
const Player = require('../models/player')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
router.post('/players', requireToken, (req, res, next) => {
  // set owner of new team to be current user
  req.body.player.owner = req.user.id
  const playerData = req.body.player

  Player.create(playerData)
    // respond to succesful `create` with status 201 and JSON of new "team"
    .then(player => {
      res.status(201).json({ player: player.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/players/:id', requireToken, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.player.owner
  console.log('id is' + req.params.id)
  console.log('Owner is' + req.user._id)

  Player.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body.player)
    .then(handle404)
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
router.delete('/players/:id', requireToken, (req, res, next) => {
  console.log('id is' + req.params.id)
  console.log('Owner is' + req.user._id)
  Player.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    .then(handle404)
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
