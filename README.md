angular-password-enforcement
============================

[![Build Status](https://travis-ci.org/jdforsythe/angular-password-enforcement.svg?branch=master)](https://travis-ci.org/jdforsythe/angular-password-enforcement)

An Angular directive for validating password input against a set of rules

## Installation
```bash
$ bower install angular-password-enforcement
```

## Setup

Include `angular-password-enforcement'` in your module's dependencies:

```js
angular.module('myApp', ['angular-password-enforcement']);
```

## Configuration

By default, the directive includes a loose policy for the valid password (defaults are shown in the example below).
This is configurable based on your needs. Simple add a config block for your app:

```js
angular.module('myApp', ['angular-password-enforcement'])
.config(function(validPasswordConfigProvider) {
  validPasswordConfigProvider.setConfig({
    minLength: 7,
    maxLength: 15,
    pattern: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#\$%\^&\*\(\)\-_=\+\[\]\{\}\\\|;:'",<.>\/\?]).{7,15})/;
  });
});
```

It is recommended to also set a constant for the explanation of your password rules, that you can inject to use in all the views you'll have
password fields:

```js
.constant('PASSWORD_RULES', '7-100 characters. At least 1 uppercase, 1 lowercase, 1 number, and 1 symbol. Symbols include: `~!@#$%^&*()-_=+[]{}\\|;:\'",.<>/?');


app.controller('MyController', function(PASSWORD_RULES) {
  var vm = this;
  vm.passwordRules = PASSWORD_RULES;
});
```

## Usage

Simply add the `valid-password` attribute to your `<input>` field.

The directive attaches `ng-minlength` and `ng-maxlength` attributes to your form field. It also attaches an `invalidPassword` property to the
`$error` on your form field, so it can be used like any of the built-in validation directives.

The examples below assume the configuration block and constant are configured as shown above.

### Example with `ng-messages`

```html
<form name="newUserForm">
  <input type="text" ng-model="vm.password" name="userPassword" ng-required="true" valid-password>
  <div ng-messages="newUserForm.userPassword.$error" ng-if="newUserForm.userPassword.$dirty">
    <div ng-message="required">Password is required</div>
    <div ng-message-exp="['minlength', 'maxlength', 'invalidPassword']">{{ vm.passwordRules }}</div>
  </div>
</form>
```

### Without `ng-messages`

```html
<form name="newUserForm">
  <input type="text" ng-model="vm.password" name="userPassword" ng-required="true" valid-password>
  <div ng-if="newUserForm.userPassword.$dirty && newUserForm.userPassword.$invalid">
    <div ng-if="newUserForm.userPassword.$error.required">Routing number is required</div>
    <div ng-if="newUserForm.userPassword.$error.minlength || newUserform.userPassword.$error.maxlength || newUserForm.userPassword.$error.invalidPassword">
      {{ vm.passwordRules }}
    </div>
  </div>
</form>
```

## Tests

A round of tests is included. To run the tests, execute:

```bash
gulp test
```

## Contributions

Contributions are always welcome. Please submit issues and pull requests.

## License

[MIT](LICENSE)
