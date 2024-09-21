const mongoose = require('mongoose');
const Cipher = require('../../utils/Cipher');
const Helper = require('../../utils/Helper');

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    api: { type: mongoose.Schema.Types.Mixed, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Static method to signup the user
userSchema.statics.signUp = function(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            var [err, duser] = await Helper.to(this.findOne({ user_id: userId }));

            if (err) {
                throw err;
            }

            if (duser) {
                return resolve(duser);
            }

            // Create a new user instance
            const newUser = new this({
                user_id: userId,
                api: {
                    apiKey: Cipher.createSecretKey(10),
                    secretKey: Cipher.createSecretKey(16),
                }
            });

            // Save the user to the database
            await newUser.save();
            return resolve(newUser);
        } catch (err) {
            return reject(err);
        }
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;