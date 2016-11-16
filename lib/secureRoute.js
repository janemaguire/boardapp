const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized'});

  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.status(401).json({ message: 'Unauthorized' });

    req.user = payload;
    next();
  });
}

module.exports = secureRoute;