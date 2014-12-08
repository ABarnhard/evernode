(function(){
  'use strict';

  angular.module('evernode')
    .controller('NotesIndexCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
        $scope.notes = [];
        $scope.pages = [];

        console.log($state.params);

        $scope.getNotes = function(limit, offset, filter){
            $scope.pages = [];
            limit = limit || 10;

            var page = $state.params.page || 1;
            offset = (page - 1) * 10;

            filter = filter || $state.params.filter || '%';

            Note.query(limit, offset, filter).then(function(res){
                $scope.notes = res.data;
                if($scope.notes.length){
                    var noteCount = $scope.notes[0].noteCount,
                        pageCount = Math.ceil(noteCount/10);
                    console.log('note count:', noteCount);
                    console.log('page count:', pageCount);
                    for(var i = 1; i <= pageCount; i++){
                        $scope.pages.push(i);
                        console.log('i from pages loop:', i);
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

        $scope.nuke = function(noteId){
          Note.nuke(noteId).then(function(response){
            $state.reload();
          });
        };

    }]);
})();
