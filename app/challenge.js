
var Runner = require('./runner');

var after = function(times, fn) {
    return function() {
        times--;
        if (!times)
            return fn();
    }
};

var Rule = function(title, match) {
    this.title = title;
    this.match = match;
};

var Challenge = function(options) {
    this.title = options.title;
    this.goal = options.goal;
    this.scope = options.scope;

    var rules = [].slice.call(arguments, 1);
    this.rules = [];
    for (var rule of rules)
        this.rules.push(new Rule(rule.title, rule.match));

    this.runner = new Runner();
};

Challenge.prototype.validate = function(code) {
    this.isValid = this.runner.verifyNestedRules(code);
    return this.isValid;
};

Challenge.prototype.verify = function(code, fn) {
    var score = {};
    var done = after(this.rules.length, fn.bind(this, score));

    var iterator;
    if (!this.isValid)
        iterator = function(rule) {
            score[rule.title] = false;
            done();
        };
    else
        iterator = function(rule) {
            var trigger = function(success) {
                score[rule.title] = success;
                done();
            };
            this.runner.run(code, this.scope, rule.match, trigger);
        };

    this.rules.forEach(iterator.bind(this))
};

Challenge.prototype.wrap = function(code) {
    return Runner.fnCodeToString(this.scope) + code;
};

module.exports = Challenge;
