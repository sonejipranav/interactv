const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authenticate.split(' ')[1] //remove ' '
        const decode = jwt.verify(token, 'verySecretValue')

        req.student = decode;
        next()
    }
    catch {
        res.json({
            message: "Authentication Failed!"
        })
    }
}

module.exports = authenticate