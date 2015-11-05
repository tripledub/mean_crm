angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {
  var vm = this;

  vm.processing = true;

  User.all()
    .success(function(data) {
      vm.processing = false;

      vm.users = data;
    });

  vm.deleteUser = function(id) {
    vm.processing = true;

    User.delete(id)
      .success(function(data) {

        User.all()
          .success(function(data) {
            vm.processing = false;
            vm.users = data;
          });
      });
  };
});
