(function(){
  'use strict';

  angular.module('evernode')
    .controller('NotesIndexCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
        $scope.notes = [];

        $scope.create = function(note){
            //console.log($scope.photos);

            Note.create(note, $scope.photos).then(function(res){
                $scope.photos = undefined;
                $scope.note = {};
                getNotes();
            }, function(res){
                console.log('error adding note', res);
            });
        };

        function getNotes(){
            Note.query().then(function(res){
                $scope.notes = res.data;
            });
        }
    }]);
})();
