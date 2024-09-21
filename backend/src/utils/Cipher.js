/**
 * 
 * Use for a Security related operation helper functions.
 */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Create a random secret key
     */
    createSecretKey: function (size = 10) {
        // return bcrypt.hashSync(userId, size);
        return crypto
            .randomBytes(size)
            .toString('hex');
    },

    /**
     * Use to encrypt string
     */
    encrypt: function (text) {
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(process.env.CYPHER_KEY), iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([
            encrypted, cipher.final()
        ]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    },

    /**
    * Use to decrypt string
    */
    decrypt: function (text) {
        let textParts = text.split(':');
        let iv = new Buffer.from(textParts.shift(), 'hex');
        let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer.from(process.env.CYPHER_KEY), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([
            decrypted, decipher.final()
        ]);

        return decrypted.toString();
    },

    /**
    * Use to generate JWT token
    */
    generateJwtToken: function (userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET);
    }
}
