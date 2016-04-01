var _ = require('lodash');
var Challenge = require('./challenge');

var Challenges = function() {};

Challenges.first= function() {
    // var code = 'var squares = numbers.map(function(n) { return n * n; });';
    return new Challenge({
        title: 'Square numbers',
        goal: 'A variable numbers already exists as an array of integers. Create a variable named squares that square each item of a that first array.',
        scope: function() {
            var numbers = [234, 114, -89, 90, 45, 0, 1];
        }
    }, {
        title: 'Square up',
        match: function(numbers, squares) {
            var expected = numbers.map(function(n) {
                return n * n;
            });

            return _.isEqual(expected, squares);
        }
    })
};

module.exports = Challenges;
