const mongoose = require('mongoose');
const db = require('../config/db');
const Board = require('../models/board');
const User = require('../models/user');

mongoose.connect(db.uri);

Board.collection.drop();

User.create({
  username: 'edweirdo',
  email: 'ed@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
}, (err, user) => {

  if(err) {
    if(err) console.log(err);
    return mongoose.connection.close();
  }

  Board.create({
    user: user,
    title: 'People',
    tags: ['people'],
    pins: [{
      title: 'Paul',
      type: 'image',
      link: 'http://imagecache6.allposters.com/LRG/61/6160/DRWG100Z.jpg'
    },{
      title: 'Brad',
      type: 'image',
      link: 'http://1.bp.blogspot.com/_oOL7ac9vK80/TURHqULt43I/AAAAAAAADUA/aNncIkMujHQ/s1600/1264715295477.jpg'
    },{
      title: 'Stephanie',
      type: 'image',
      link: 'http://www.hummingbirds.net/images/elliott.jpg'
    }]
  }, (err, board) => {
    if(err) console.log(err);
    if(board) console.log('Board created');

    mongoose.connection.close();
  });
});
