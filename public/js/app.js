"use strict";function Router(e,t){e.state("landing",{url:"/",templateUrl:"/templates/landing.html"}).state("login",{}),t.otherwise("/")}angular.module("boardApp",["ngResource","ui.router","satellizer"]).config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"];
//# sourceMappingURL=app.js.map
