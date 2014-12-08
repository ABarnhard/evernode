(function(){
  'use strict';

  angular.module('evernode')
    .controller('NotesShowCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){

        Note.findOne($state.params.noteId).then(function(res){
            $scope.note = res.data[0];
        });

        $scope.backToIndex = function(){
            $state.go('notes.index');
        }
    }]);
})();
