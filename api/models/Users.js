const mongoose = require('mongoose');
const crypto = require('crypto');   /* Crypto Help to encrypt and Decrypt Data */
const uuidV1 = require('uuid');     /* Need to be installed - npm install uuid */


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 55,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    history: {
        type: Array,
        default: [],
    },
    salt: String,
    /* 
        Password salting is a technique to protect passwords stored in databases by adding a string of 32 or more characters and then hashing them. 
        Salting prevents hackers who breach an enterprise environment from reverse-engineering passwords and stealing them from the database. 
    */

}, { timestamps: true });


// This methods will set the HASHED Password to the Table
userSchema.virtual('password')
    .set(function (password) {
        this._password = password,
            this.salt = uuidV1.v1(),
            this.hashedPassword = this.encryptPassword(password)
    });


// This methods will encrypt the Password to HASH
userSchema.methods = {
    // For MATCHING the Given password with the hashed Password
    authenticate: function(pass) {
        return this.encryptPassword(pass) === this.hashedPassword;
    },

    encryptPassword: function (password) {
        if (!password) return '';

        try {
            return crypto.createHmac("sha1", this.salt).update(password).digest('hex');
        } catch (error) {
            return '';
        }
    }
};

module.exports = mongoose.model("User", userSchema);