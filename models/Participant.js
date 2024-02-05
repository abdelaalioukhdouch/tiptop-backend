const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hasParticipated: {
    type: Boolean,
    default: true
  },
});

module.exports = mongoose.model('Participant', participantSchema);
