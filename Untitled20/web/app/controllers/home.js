angular.module('Starter')
  .controller('HomeController', function($scope, $wakandaManager) {
    $wakandaManager.getDataStore().then(function(ds) {
      console.log('Angular-Wakanda is ready!');
      //you can use datastore and handle your data 
      // ds.Item.$all().$promise.then(function(event) {
      //   $scope.tasks = event.result;
      // });
  	}).catch(function(err) {
      console.warn(err);
    });
  });