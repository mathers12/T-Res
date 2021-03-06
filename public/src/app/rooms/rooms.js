(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('rooms', {
            url: '/rooms',
            views: {
                "main": {
                    controller: 'RoomsController',
                    templateUrl: 'rooms/rooms.tpl.html'
                }
            },
            data:{ pageTitle: 'Rooms' }
        });
    });

    app.controller('RoomsController', function ($scope, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            var States = $resource('/states');
            $scope.states = States.query({});

            var Tables = $resource('/tables');
            $scope.tables = Tables.query({});

            var Parts = $resource('/parts');
            $scope.parts = Parts.query({});

            var Rooms = $resource('/rooms');
            $scope.rooms = Rooms.query({});
        };

        // modifying Room if input box
        $scope.SaveRoom = function (room) {
            console.log("Selected table name: "+ room.name);
            var Rooms = $resource('/rooms');
            Rooms.save(room);
            $scope.rooms = Rooms.query({});
        };

        // modifying Room if selectbox
        //$scope.SaveRoom = function (room, changedRoom) {
        //    console.log("Selected room name: "+ changedRoom.name);
        //    room.order = changedRoom.order;
        //    var Rooms = $resource('/rooms');
        //    Rooms.save(room);
        //    $scope.rooms = Rooms.query({});
        //};

        // clean Room
        $scope.CleanRoom = function (room) {
            room.name =  "";
            room.positioning = "";
            room.order = $scope.rooms.length;
            console.log("Room: " + room.order);
            var Rooms = $resource('/rooms');
            Rooms.save(room);
            $scope.rooms = Rooms.query({});
        };

        // delete Room
        $scope.DeleteRoom = function (room) {
            console.log("Room: " + room.name);
            var Room = $resource('/rooms/:id'),
                Rooms = $resource('/rooms');
            Room.delete({id: room._id});
            $scope.rooms = Rooms.query({});
        };

        // adding new Room
        $scope.AddRoom = function (room) {
            var roomTemplate = {
                name: "",
                positioning: "",
                order: $scope.rooms.length
            };

            if (room === undefined) {
                room = roomTemplate;
            } else {
                room.order = $scope.rooms.length;
            }
            console.log("Room: " + room.order);
            var newRoom = $resource('/rooms/add');
            newRoom.save(room);
            var Rooms = $resource('/rooms');
            $scope.rooms = Rooms.query({});
        };


        init();
    });

}(angular.module("T-Res-App.rooms", [
    'ui.router'
])));