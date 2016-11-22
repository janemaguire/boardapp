const mongoose = require('mongoose');
const db = require('../config/db');
const Board = require('../models/board');
const User = require('../models/user');

mongoose.connect(db.uri);

Board.collection.drop();
User.collection.drop();

User.create([{
  username: 'edweirdo',
  email: 'ed@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'jane',
  email: 'ed@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
}], (err, users) => {

  if(err) {
    if(err) console.log(err);
    return mongoose.connection.close();
  }

  Board.create([{
    user: users[0],
    title: 'Sailboats',
    description: 'A board for all of those who love speed, the wind and the sea.',
    tags: ['sailing, sea, wind, boats, swan, wally, sails'],
    pins: [{
      title: 'Alinghi',
      type: 'image',
      link: 'http://www.dalco.ch/fileadmin/Press_pictures/Alinghi/Ivo_Rovira_YO8D9375%20c.jpg'
    },{
      title: 'Luna Rossa',
      type: 'image',
      link: 'http://4.bp.blogspot.com/-FBe44Brd9B0/UM1vcayLznI/AAAAAAAAdt4/FfJb0RxJQaU/s1600/U3C1189.jpg'
    },{
      title: 'Trieste',
      type: 'image',
      link: 'https://res.cloudinary.com/antlos/image/upload/v1474457962/listings/lfhtyenkdmzswuemwuvq.jpg'
    },{
      title: 'Maserati',
      type: 'image',
      link: 'http://www.edneyap.com/wp-content/uploads/2013/08/Maserati_Delivery_Day6_-162.jpg'
    },{
      title: 'Australian 18ft',
      type: 'image',
      link: 'http://cdn.sailingscuttlebutt.com/wp-content/uploads/2013/09/skifffff.jpg'
    },{
      title: 'Columbia',
      type: 'image',
      link: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Jsj-024-columbia.jpg'
    },{
      title: 'Swan50',
      type: 'image',
      link: 'http://www.yacht.de/typo3temp/pics/2_10725d0181.jpeg'
    },{
      title: 'Swan50',
      type: 'image',
      link: 'http://www.hamnen.se/images/stories/batar/segelbatar/2015/ClubSwan50/Bildspel2//SwanClub50Bildspel22.jpg'
    },{
      title: 'Wally Nano',
      type: 'image',
      link: 'https://s-media-cache-ak0.pinimg.com/originals/3b/70/65/3b70659d52072e0d07b7ccb9b67279f0.jpg'
    },{
      title: 'Monkey Fist',
      type: 'image',
      link: 'http://extremepara.com/image/data/Knotters_Gallery/MonkeyFist.gif'
    },{
      title: 'Moth',
      type: 'image',
      link: 'http://www.sailjuice.com/custom/bora-gulari-yeehaa.jpg'
    },{
      title: 'Kennedy',
      type: 'image',
      link: 'http://www.heralddeparis.com/wp-content/uploads/2011/05/jack-jackie-kennedy-sailing-cape-cod-life-1.jpg'
    }]
  },{
    user: users[0],
    title: 'Architecture',
    tags: ['sailing, sea, wind, boats, swan, wally, sails'],
    description: 'Some of my favorite buildings, architets and gemoterical structures.',
    pins: [{
      title: 'Heydar Alijev',
      type: 'image',
      link: 'http://assets.dornob.com/wp-content/uploads/2016/02/heydar-alijev-centre.jpg'
    },{
      title: 'Ghery',
      type: 'image',
      link: 'http://www.sage-ec.com/wp-content/uploads/2016/09/7027803-modern-architecture-wallpaper-hd.jpg'
    },{
      title: 'Bilbao',
      type: 'image',
      link: 'http://artreport.com/file/2016/03/Guggenheim-Museum-Bilbao-in-Spain-francesco-clemente-artreport.jpg'
    },{
      title: 'Libeskind',
      type: 'image',
      link: 'https://s-media-cache-ak0.pinimg.com/736x/a3/20/ff/a320ffca12fb03e4ce407950652227ee.jpg'
    },{
      title: 'Kobe House',
      type: 'image',
      link: 'http://www.e-architect.co.uk/images/jpgs/japan/kobe_house_jtaa261208_4.jpg'
    },{
      title: 'Oscar Niemeyer',
      type: 'image',
      link: 'http://1.bp.blogspot.com/-uPQAWH3bOEA/TXHN-_yiYiI/AAAAAAAAHv4/hRyAZ--CJ88/s1600/oscar_niemeyer.jpg'
    },{
      title: 'Oscar Niemeyer',
      type: 'image',
      link: 'http://images.adsttc.com/media/images/524c/7fad/e8e4/4ecb/1700/040c/slideshow/ANDREW-PROKOS-BRASILIA-9361-C.jpg?1380745126'
    },{
      title: 'Oaxaca',
      type: 'image',
      link: 'http://www.panamericanworld.com/sites/default/files/img_9415.jpg'
    },{
      title: 'MIT',
      type: 'image',
      link: 'http://www.holyurl.co/wp-content/uploads/2014/06/MITArch-1170x878.jpg'
    },{
      title: 'Acropolis',
      type: 'image',
      link: 'http://resources.touropia.com/gfx/d/famous-greek-temples/erechtheum.jpg'
    },{
      title: 'Pantheon',
      type: 'image',
      link: 'http://www.stendhalhotelrome.it/img/pantheon01.jpg'
    },{
      title: 'Brunelleschi',
      type: 'image',
      link: 'http://www.metalocus.es/sites/default/files/file-images/filippo-brunelleschi_the_dome_of_florence_metalocus_03_1280.png'
    },{
      title: 'Chrysler',
      type: 'image',
      link: 'http://www.metalocus.es/sites/default/files/file-images/filippo-brunelleschi_the_dome_of_florence_metalocus_03_1280.png'
    },{
      title: 'Bosco Verticale',
      type: 'image',
      link: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Bosco_verticale,_milan,_italy.jpg'
    }]
  }], (err, board) => {
    if(err) console.log(err);
    if(board) console.log('Board created');

    mongoose.connection.close();
  });
});
