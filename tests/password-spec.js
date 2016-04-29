describe('directive', function() {

  beforeEach(module('angular-password-enforcement'));

  describe('config test', function() {
    it('should configure properly', function() {
      module(function(validPasswordConfigProvider) {
        validPasswordConfigProvider.setConfig({
          minLength: 5,
          maxLength: 10,
          pattern: /^[a-zA-Z]\w{4,9}$/
        });
      });
      inject(function(validPasswordConfig) {
        expect(validPasswordConfig.getMinLength()).toEqual(5);
        expect(validPasswordConfig.getMaxLength()).toEqual(10);
        expect(angular.equals(validPasswordConfig.getPattern(), /^[a-zA-Z]\w{4,9}$/)).toEqual(true);
      });
    });
  });


  describe('directive validation', function() {

    var $scope, form;

    beforeEach(module(function(validPasswordConfigProvider) {
      validPasswordConfigProvider.setConfig({
        minLength: 5,
        maxLength: 10,
        pattern: /^[a-zA-Z]\w{4,9}$/
      });
    }));

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope;

      var element = angular.element(
        '<form name="form">' +
        '<input ng-model="model.password" name="password" valid-password>' +
        '</form>'
      );

      $compile(element)($scope);

      $scope.model = { password: '' };
      form = $scope.form;
    }));

    describe('password validation', function() {

      it('should fail with short password', function() {
        form.password.$setViewValue('abc');
        $scope.$digest();

        expect($scope.model.password).toBeUndefined();
        expect(form.password.$valid).toBe(false);
        expect(form.password.$error.invalidPassword).toBe(true);
      });

      it('should fail with long password', function() {
        form.password.$setViewValue('abcdefghijklmnopqrstuv');
        $scope.$digest();

        expect($scope.model.password).toBeUndefined();
        expect(form.password.$valid).toBe(false);
        expect(form.password.$error.invalidPassword).toBe(true);
      });

      it('should fail with invalid characters', function() {
        form.password.$setViewValue('abc123_-$');
        $scope.$digest();

        expect($scope.model.password).toBeUndefined();
        expect(form.password.$valid).toBe(false);
        expect(form.password.$error.invalidPassword).toBe(true);
      });

      it('should pass with valid length and pattern', function() {
        form.password.$setViewValue('abc123_AB');
        $scope.$digest();

        expect($scope.model.password).toBe('abc123_AB');
        expect(form.password.$valid).toBe(true);
        expect(form.password.$error.invalidPassword).toBeUndefined();
      });

    });

  });

});
