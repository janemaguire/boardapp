"use strict";function Router(o,r){o.state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("menu",{url:"/menu",templateUrl:"/templates/menu.html"}).state("boardsIndex",{url:"/boards",templateUrl:"/templates/boardsIndex.html",controller:"BoardsIndexController as boardsIndex"}).state("boardsNew",{url:"/boards/new",templateUrl:"/templates/boardsNew.html",controller:"BoardsNewController as boardsNew"}).state("userBoards",{url:"/boards/me",templateUrl:"/templates/userBoards.html",controller:"UserBoardsController as userBoards"}).state("boardsFollowing",{url:"/boards/following",templateUrl:"/templates/boardsFollowing.html",controller:"BoardsFollowingController as boardsFollowing"}).state("boardsShow",{url:"/boards/:id",templateUrl:"/templates/boardsShow.html",controller:"BoardsShowController as boardsShow"}).state("boardsEdit",{url:"/boards/:id/edit",templateUrl:"/templates/boardsEdit.html",controller:"BoardsEditController as boardsEdit"}).state("pinsShow",{url:"/pins/:id",templateUrl:"/templates/pinsShow.html",controller:"PinsShowController as pinsShow"}),r.otherwise("/")}function Auth(o){o.tokenPrefix="",o.loginUrl="/login",o.signupUrl="/register",o.facebook({clientId:"592951794244851"}),o.instagram({clientId:"64171eadf0914dd7bf7839bc034e42e0"})}function WhiteList(o){o.resourceUrlWhitelist(["self","https://www.youtube.com/**"])}function RegisterController(o,r){function e(){o.signup(t.user).then(function(){r.go("menu")})}var t=this;t.user={},t.submit=e}function LoginController(o,r){function e(){o.login(n.credentials).then(function(){r.go("menu")})}function t(e){o.authenticate(e).then(function(){r.go("menu"),console.log("Is this running")})}var n=this;n.credentials={},n.submit=e,n.authenticate=t}function Board(o){return new o("/boards/:id",{id:"@_id"},{update:{method:"PUT"}})}function BoardsIndexController(o){function r(o){var r=new RegExp(e.queryString,"i");return r.test(o.title)||r.test(o.tags)}var e=this;e.queryString="",e.filter=r,e.all=o.query()}function BoardsFollowingController(o,r){var e=this,t=r.getPayload();e.all=o.query({followedBy:t._id})}function BoardsNewController(o,r){function e(){o.save(t.board,function(o){r.go("boardsShow",{id:o._id})})}var t=this;t.board={},t.create=e}function UserBoardsController(o,r,e){function t(o){i.currentBoard=o,i.formEditVisible=!0}function n(){console.log("clicked hide form!"),i.formEditVisible=!1}function l(r){o.update({id:r._id,boardId:e.params.id},r)}function a(o){console.log("clicked!",o),o.$remove(function(){e.reload()})}var i=this;i.formEditVisible=!1,i.currentBoard;var d=r.getPayload();i.all=o.query({user:d._id}),i.showEditForm=t,i.hideEditForm=n,i.updateBoard=l,i.delete=a}function BoardsShowController(o,r,e,t){function n(){b.formVisible=!0}function l(){b.formVisible=!1,b.newPin={}}function a(){r.save({boardId:e.params.id},b.newPin,function(){b.pin={},l(),b.board=o.get(e.params)})}function i(r){b.copyPin=r,delete b.copyPin._id;var e=t.getPayload();b.all=o.query({user:e._id}),console.log("clicked",b.all),b.formCopyVisible=!0}function d(o){r.save({boardId:o._id},b.copyPin,function(){e.reload()})}function s(){b.formCopyVisible=!1}function u(o){b.formEditVisible=!0,b.currentPin=o}function c(){b.formEditVisible=!1}function p(o){console.log("delete me",o),r.remove({id:o._id,boardId:e.params.id},function(){e.reload()})}function f(o){console.log("clicked!",o),u(o)}function g(o){r.update({id:o._id,boardId:e.params.id},o)}function m(){b.board.followedBy.indexOf(C)<0&&(console.log("board not already followed"),b.board.followedBy.push(C),b.board.$update(function(o){console.log("succes",o)})),B++}function h(){if(B<1){var o=b.board.followedBy.indexOf(C);b.board.followedBy.splice(o,1),b.board.$update(function(o){console.log("succes",o)})}B--}var b=this,w=t.getPayload(),C=w._id,B=1;b.formVisible=!1,b.formEditVisible=!1,b.board=o.get(e.params),b.newPin={},b.showCreateForm=n,b.hideCreateForm=l,b.showCopyForm=i,b.copyPinToBoard=d,b.hideCopyForm=s,b.deletePin=p,b.unfollowBoard=h,b.followBoard=m,b.updateBoard=g,b.showEditForm=u,b.hideEditForm=c,b.createPin=a,b.showPin=f}function BoardsEditController(o,r){function e(){t.board.$update(function(){console.log("clicked"),r.go("boardsShow",r.params)})}var t=this;t.board=o.get(r.params),t.updateBoard=e}function dragDrop(){var o=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"="},link:function(r,e){r.base64=null,r.active=!1,o.onload=function(){r.base64=o.result,r.$apply()},e.on("dragover",function(){r.active=!0,r.$apply()}).on("dragover",function(o){o.preventDefault()}).on("dragleave",function(){r.active=!1,r.$apply()}).on("drop",function(r){r.preventDefault();var e=(r.target.files||r.dataTransfer.files)[0];o.readAsDataURL(e)})}}}function MainController(o,r){function e(){o.logout().then(function(){r.go("login")})}var t=this;t.isLoggedIn=o.isAuthenticated,t.logout=e}function Pin(o){return new o("/boards/:boardId/pins/:id",{id:"@_id"},{update:{method:"PUT"}})}function PinsShowController(o,r){function e(){t.pin.$remove(function(){r.go("boardsShow")})}var t=this;t.pin=o.get(r.params),t.delete=e}function PinsEditController(o,r){function e(){t.pin.$update(function(){r.go("pinsShow",r.params)})}var t=this;t.pin=o.get(r.params),t.update=e}function UploadController(){var o=this;o.data={}}function youtube(){return{restrict:"E",replace:!0,scope:{link:"@",width:"@",height:"@"},template:'<iframe width="{{ width }}" height="{{ height }}" src="{{ src }}" frameborder="0" allowfullscreen></iframe>',link:function(o){o.src="https://www.youtube.com/embed/"+o.link.split("=").splice(-1)[0]}}}angular.module("boardApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth).config(WhiteList),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],WhiteList.$inject=["$sceDelegateProvider"],angular.module("boardApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("boardApp").factory("Board",Board),Board.$inject=["$resource"],angular.module("boardApp").controller("BoardsIndexController",BoardsIndexController).controller("BoardsFollowingController",BoardsFollowingController).controller("BoardsNewController",BoardsNewController).controller("BoardsShowController",BoardsShowController).controller("BoardsEditController",BoardsEditController).controller("UserBoardsController",UserBoardsController),BoardsIndexController.$inject=["Board"],BoardsFollowingController.$inject=["Board","$auth"],BoardsNewController.$inject=["Board","$state"],UserBoardsController.$inject=["Board","$auth","$state"],BoardsShowController.$inject=["Board","Pin","$state","$auth"],BoardsEditController.$inject=["Board","$state"],angular.module("boardApp").directive("dragDrop",dragDrop),angular.module("boardApp").controller("MainController",MainController),MainController.$inject=["$auth","$state"],angular.module("boardApp").factory("Pin",Pin),Pin.$inject=["$resource"],angular.module("boardApp").controller("PinsShowController",PinsShowController).controller("PinsEditController",PinsEditController),PinsShowController.$inject=["Pin","$state"],PinsEditController.$inject=["Pin","$state"],angular.module("boardApp").controller("UploadController",UploadController),angular.module("boardApp").directive("youtube",youtube);
//# sourceMappingURL=app.js.map
