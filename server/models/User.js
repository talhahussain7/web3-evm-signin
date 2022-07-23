const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        public_address: {
            type: String,
            unique: true,
            required: true
          },
          isRegistered: {
            type: Boolean,
          },
          nonce: {
            type: Number,
            default: Math.floor(Math.random() * 1000000)
          } 
    }
)

module.exports = mongoose.model("user", UserSchema);