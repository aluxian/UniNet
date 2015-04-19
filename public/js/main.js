// WebSocket connection
var socket = io();

$(document).ready(function() {

  // Conversations page search field
  $('#conversationSearchUserField').typeahead({
    minLength: 3,
    highlight: true,
  }, {
    displayKey: function(user) {
      return user.profile.name;
    },
    source: function(query, callback) {
      console.log(query);
      socket.emit('search:people', query, callback);
    }
  }).on('typeahead:selected', function(e, user) {
    document.location = '/conversations/' + user._id;
  });

});

angular.module('myApp', [])
  .controller('ConversationMessagesCtrl', ['$scope', function($scope) {
    $scope.messages = [];

    // Receive messages
    socket.on('conversations:msg', function(msg) {
      $scope.messages.push(msg);
      $scope.$apply();
    });

    if (window.partnerUser) {
      // Load past messages
      socket.emit('conversations:get', partnerUser._id, function(data) {
        $scope.messages = data;
        $scope.$apply();
      });

      // Send the message
      $scope.send = function($e) {
        $e.preventDefault();

        socket.emit('conversations:send', {
          id: partnerUser._id,
          body: $scope.msg
        }, function(msg) {
          $scope.messages.push(msg);
          console.log('got cb', msg);
          $scope.msg = '';
          $scope.$apply();
        });
      };
    }
  }]);
