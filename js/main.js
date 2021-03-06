var myScope;

var app = angular.module('TictactoeApp', ["firebase"]);

app.directive('myDirective', function () {
  return {
  	template: '<ul class="rating">' +
                  '<li x-ng-repeat="star in stars" class="filled" x-ng-click="toggle($index)">' +
                      '\u2605' +
                  '</li>' +
                '</ul>',
    restrict: 'A',
    scope: {
    	ratingValue: "="	// Two-way data bind this thing!
    },
    link: function (scope, elem, attrs) {
      console.log("Directive", scope, elem, attrs);

      scope.$watch("ratingValue", function(newThing, oldThing){
  			scope.stars = [];
				for(var x = 0; x < parseInt(newThing); x++)
				{
					scope.stars.push({});
				}
      });

      scope.toggle = function(index) {
		    scope.ratingValue = index + 1;
			};
    }
  }
});

app.controller('tttController', ["$scope", "$http", "$firebase", function ($scope, $http, $firebase) {
	myScope = $scope;
	$scope.someVar = 5;

	// var promise = $http.get("https://api.github.com/repos/lorint/AndrewIG/issues");
	// promise.success(function(data){
	// 	$scope.issues = data;
	// });

	// this is creating new Firebase connection using the Firebase object
<<<<<<< HEAD
	var ref = new Firebase("https://turnip.firebaseio.com");
=======
	var ref = new Firebase("https://tictacboo.firebaseio.com/");
>>>>>>> ddac10c7bd87b5dac3053cd71da5bfc5ecfbc863
	//pass the firebase connection/object to angularfire
	var sync = $firebase(ref); // enables the firebase binding
	var firebase = sync.$asObject();

	var newGame = {
 		squares: ["","","","","","","","",""],
 		players: ["playerOne", "playerTwo"],
 		gameInProgress: true,
		// declared a variable in order to switch from Player 1 to Player 2
 		playerOne: true
	};

	firebase.$bindTo($scope, 'db').then(function(){
		$scope.db = newGame;
	});

	// if (!$scope.db.gameInProgress) {
	//  	  $scope.db = newGame;
	//   $scope.db.squares = $scope.db.squares || new Array();
 // 	  $scope.db.squares.push("new string");
 // 	}
 // });

// 	  // Example of dynamically adding to a possibly empty cells array
// 	  $scope.storeDetails.cells = $scope.storeDetails.cells || new Array();
// 	  $scope.storeDetails.cells.push("new string");
// 	}
// });            

	//function to identify which squares the player (1 or 2) selected
	$scope.placeMarker = function(squaresindex) {
		if ($scope.db.squares[squaresindex] == "") {
			if ($scope.db.playerOne == true) {
				$scope.db.squares[squaresindex] = 1;
				winConditions();
			} else {
				$scope.db.squares[squaresindex] = -1;
				winConditions();
			}
		} else {
			alert("This square is already taken");
		}
	}



	function winConditions() {
		if (($scope.db.squares[0] == 1 && $scope.db.squares[1] == 1 && $scope.db.squares[2] == 1) || 
		($scope.db.squares[3] == 1 && $scope.db.squares[4] == 1 && $scope.db.squares[5] == 1) ||
		($scope.db.squares[6] == 1 && $scope.db.squares[7] == 1 && $scope.db.squares[8] == 1) ||
		($scope.db.squares[0] == 1 && $scope.db.squares[3] == 1 && $scope.db.squares[6] == 1) ||
		($scope.db.squares[1] == 1 && $scope.db.squares[4] == 1 && $scope.db.squares[7] == 1) ||
		($scope.db.squares[2] == 1 && $scope.db.squares[5] == 1 && $scope.db.squares[8] == 1) ||
		($scope.db.squares[0] == 1 && $scope.db.squares[4] == 1 && $scope.db.squares[8] == 1) ||
		($scope.db.squares[2] == 1 && $scope.db.squares[4] == 1 && $scope.db.squares[6] == 1)) {
			$scope.boowins=true;
		} else if (
			($scope.db.squares[0] == -1 && $scope.db.squares[1] == -1 && $scope.db.squares[2] == -1) || 
			($scope.db.squares[3] == -1 && $scope.db.squares[4] == -1 && $scope.db.squares[5] == -1) ||
			($scope.db.squares[6] == -1 && $scope.db.squares[7] == -1 && $scope.db.squares[8] == -1) ||
			($scope.db.squares[0] == -1 && $scope.db.squares[3] == -1 && $scope.db.squares[6] == -1) ||
			($scope.db.squares[1] == -1 && $scope.db.squares[4] == -1 && $scope.db.squares[7] == -1) ||
			($scope.db.squares[2] == -1 && $scope.db.squares[5] == -1 && $scope.db.squares[8] == -1) ||
			($scope.db.squares[0] == -1 && $scope.db.squares[4] == -1 && $scope.db.squares[8] == -1) ||
			($scope.db.squares[2] == -1 && $scope.db.squares[4] == -1 && $scope.db.squares[6] == -1)) {
				$scope.buddywins=true;
		// add reset game
		} else if (
			($scope.db.squares[0] == 1 || $scope.db.squares[0] == -1) && ($scope.db.squares[1] == 1 || $scope.db.squares[1] == -1) && 
		 	($scope.db.squares[2] == 1 || $scope.db.squares[2] == -1) && ($scope.db.squares[3] == 1 || $scope.db.squares[3] == -1) && 
		 	($scope.db.squares[4] == 1 || $scope.db.squares[4] == -1) && ($scope.db.squares[5] == 1 || $scope.db.squares[5] == -1) &&
		 	($scope.db.squares[6] == 1 || $scope.db.squares[6] == -1) && ($scope.db.squares[7] == 1 || $scope.db.squares[7] == -1) &&
		 	($scope.db.squares[8] == 1 || $scope.db.squares[8] == -1)) {
		 		$scope.itsatie=true;
		 }
		/*for (var i = 0; i = $scope.db.squares.length; i++);
 			if ($scope.squares !== [""]) {
 				console.log("Boo & Buddy Win!");
 			}*/

			if ($scope.db.playerOne == true) {
				$scope.db.playerOne = false; 
			}
			else {
				$scope.db.playerOne = true;// =assigns; ==evaluates
			}
	}
}]);
