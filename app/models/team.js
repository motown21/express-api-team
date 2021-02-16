const mongoose = require('mongoose')
// const playerSchema = require('./player')
// const Player = mongoose.model('Player', playerSchema)
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coach: {
    type: String,
    required: true
  },
  mascot: {
    type: String,
    required: true
  },
  record: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  player: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)
