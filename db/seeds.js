const mongoose = require('mongoose');
const db = require('../config/db');
const Pin = require('../models/pin');

mongoose.connect(db.uri);

Pin.collection.drop();

Pin.create([{
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
}], (err, pins) => {
  if(err) console.log('There was an error creating pins', err);

  console.log(`${pins.length} pins created!`);
  mongoose.connection.close();
});
