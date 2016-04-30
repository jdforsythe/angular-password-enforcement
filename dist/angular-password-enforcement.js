(function() {
  function ValidPasswordConfig() {
    this.minLength = 7;
    this.maxLength = 30;
    this.pattern = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).{7,30})$/;

    this.$get = function() {
      var config = {
        minLength: this.minLength,
        maxLength: this.maxLength,
        pattern: this.pattern
      };

      return {
        getMinLength: function() {
          return config.minLength;
        },
        getMaxLength: function() {
          return config.maxLength;
        },
        getPattern: function() {
          return config.pattern;
        }
      };
    };

    this.setConfig = function(config) {
      this.minLength = config.minLength ? config.minLength : this.minLength;
      this.maxLength = config.maxLength ? config.maxLength : this.maxLength;
      this.pattern = config.pattern ? config.pattern : this.pattern;
    };
  }

  function ValidPassword(validPasswordConfig) {
    var minLength = validPasswordConfig.getMinLength(),
        maxLength = validPasswordConfig.getMaxLength(),
        pattern = validPasswordConfig.getPattern();

    return {
      restrict: 'A',
      require: 'ngModel',

      compile: function(element, attributes) {
        attributes.$set('ng-minlength', minLength);
        attributes.$set('ng-maxlength', maxLength);

        return function(scope, element, attrs, ngModel) {
          ngModel.$validators.invalidPassword = function(value) {
            if (typeof value !== 'string') return false;

            // should match the regex
            if (!pattern.test(value)) return false;

            return true;
          };
        };
      }
    };
  }

  angular.module('angular-password-enforcement', [])
    .provider('validPasswordConfig', ValidPasswordConfig)
    .directive('validPassword', ['validPasswordConfig', ValidPassword]);
})();
