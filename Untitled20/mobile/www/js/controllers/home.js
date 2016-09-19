angular.module('starter')
  .controller('HomeController', function($scope, $wakandaManager) {
    $wakandaManager.getDataStore().then(function (ds) {
      //you can use datastore and handle your data 
      // ds.Item.$all().$promise.then(function(event) {
      //   $scope.tasks = event.result;
      // });
  	});
  });