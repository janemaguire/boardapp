const request = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;

function facebook(req, res) {

  // Request an access token
  request.get({
    url: 'https://graph.facebook.com/v2.5/oauth/access_token',
    qs: {
      code: req.body.code,
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: req.body.redirectUri
    },
    json: true
  }).then((accessToken) => {

    // Request user's profile with accessToken
    return request.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
      qs: accessToken,
      json: true
    });

  }).then((profile) => {

    // Find or create a user
    User.findOne({ email: profile.email }, (err, user) => {
      if(err) return res.status(500).json({ error: err });

      if(!user) {
        user = new User({
          facebookId: profile.id,
          profileImage: profile.picture.data.url,
          email: profile.email,
          username: profile.name
        });
      } else {
        user.facebookId = profile.id;
        user.profileImage = profile.picture.data.url;
      }

      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        // Generate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        res.status(200).json({
          user,
          token
        });
      });
    });

  });
}

function instagram(req, res) {
  // Request an access token
  request.get({
    url: 'https://api.instagram.com/oauth/authorize/?client_id=	64171eadf0914dd7bf7839bc034e42e0&redirect_uri=https://boiling-ocean-15737.herokuapp.com&response_type=code'
    // qs: {
    //   code: req.body.code,
    //   client_id: process.env.INSTAGRAM_APP_ID,
    //   client_secret: process.env.INSTAGRAM_APP_SECRET,
    //   redirect_uri: 'req.body.redirectUri'
    // },
    // json: true
  }).then((accessToken) => {
    console.log(req.body.code);

    const params = {
      code: req.body.code,
      client_id: '64171eadf0914dd7bf7839bc034e42e0',
      client_secret: '515f0e2240324d309702de5f892ec085',
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Request user's profile with accessToken
    return request.post({
      url: 'https://api.instagram.com/oauth/access_token',
      form: params,
      json: true
    });

  })
  .then((profile) => {
    console.log(profile);

    // Find or create a user
    User.findOne({ id: profile.id }, (err, user) => {
      if(err) return res.status(500).json({ error: err });

      if(!user) {
        user = new User({
          instagramId: profile.id,
          // profileImage: profile.picture.data.url,
          // email: profile.email,
          username: profile.user.username
        });
      } else {
        user.instagramId = profile.id;
      }

      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        // Generate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        res.status(200).json({
          user,
          token
        });
      });
    });
  });
}

module.exports = {
  facebook,
  instagram
};
