const mongoose = require('mongoose');
const { Schema } = mongoose;

const passwordSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  website: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

const PasswordModel = mongoose.model('Password', passwordSchema);

module.exports = PasswordModel;
