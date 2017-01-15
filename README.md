# Bored

Bored is a place to collect your favourite things. Users can pin images and videos to boards in order to share collections with other people or to use as inspiration.

![](/src/images/bored1.png)

With full CRUD actions and secure routes, Bored allows users to create, update and delete their own boards and pins. Users can also see and search other boards and pins from other users.

Users can login in using Facebook, Instagram or email and password.

Bored is a MEAN stack app built by [Eduardo Fasano](https://github.com/eduardofasano), [Jane Maguire](https://github.com/janemaguire/), [Luke Reynolds](https://github.com/essexrambler) and [Peter Williams](https://github.com/pedroeldiablo).

###[Launch Bored](https://bored-app.herokuapp.com/)

To see the features available to logged in users you can use the test details:

email: bob@example.com

password: password

### Technologies used
AngularJS | BCrypt | Bourbon | Body Parser | Bower | Express | Gulp | HTML | Javascript | JWT | Mongoose | MongoDB | Node.js | Request-Promise | Satellizer | SCSS

![](/src/images/bored2.png)

###Approach taken
The idea for the app came from the notion of a physical pin board where you could collect together memories, souvenirs or inspirational items. Wouldn't it be great if you could do this online?

We started off by getting our heads around user journeys for the features we would like to have, and drawing wireframes. Then we planned out our time using Trello to list tasks, blockers and extra features that would come after MVP. Once it was time to start coding we found pair programming helped us solve problems more quickly and with better quality code.

![](/src/images/bored3.png)

###Challenges
* Deciding on our models for users, boards and pins was complicated. In the end we had users as a referenced record in the board schema and pins as an embedded record in the board schema.
* Resolving conflicts when committing was sometimes a challenge but we worked well as a team to solve them together.
* Styling took longer than expected as we were all new to Bourbon but we are really happy with the look and feel.
* Given more time we would have liked the ability to pin Soundcloud clips however we weren't granted access to an API key until it was too late.
