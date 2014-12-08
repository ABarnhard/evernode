(function(){
  'use strict';

  angular.module('evernode')
    .controller('NotesIndexCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
        $scope.notes = [];
        $scope.pages = [];

        $scope.getNotes = function(limit, offset, filter){
            $scope.pages = [];
            Note.query(limit, offset, filter).then(function(res){
                $scope.notes = res.data;
                if($scope.notes.length){
                    var noteCount = $scope.notes[0].noteCount,
                        pageCount = Math.ceil(noteCount/10);
                    for(var i = 1; i <= pageCount; i++){
                        $scope.pages.push(i);
                    }

                }
            });
        };

        $scope.getNotes();

        $scope.create = function(note){
            //console.log($scope.photos);

            Note.create(note, $scope.photos).then(function(res){
                $scope.photos = undefined;
                $scope.note = {};
                $scope.getNotes();
            }, function(res){
                console.log('error adding note', res);
            });
        };

        $scope.viewNote = function(noteId){
            console.log(noteId);
            $state.go('notes.show', {noteId:noteId});
        };

    }]);
})();
