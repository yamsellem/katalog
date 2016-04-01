require('operative');
var acorn = require('acorn');

var Runner = function() {};

Runner.fnCodeToString = function(fn) {
    if (!fn) return '';
    return fn.toString().replace(/^function.*{/, '').replace(/}$/, '');
};

Runner.fnArgumentsToString = function(fn) {
    return fn.toString().replace(/function.*\(/, '').replace(/\)[^]*/, '');
};

Runner.initArguments = function(params) {
    var args = '';
    var names = params.split(',');
    for (var name of names)
        args += 'var ' + name + '=' + name + '||null;';
    return args;
};

Runner.prototype.run = function(code, scope, match, trigger) {
    var worker = operative(function(__code__, __match__) {
        // emulate document, so dom manipulation could be tested in challenges (and don't break them)
        eval(__code__);
    });

    var limitExecutionTime = setTimeout(function() {
        worker.terminate();
        trigger(false);
    }, 700);

    function earlyExit() {
        clearTimeout(limitExecutionTime);
        worker.terminate();
    };

    var passed = false;
    function latchedVerify() {
        if (!passed) {
            earlyExit();
            if (match.apply(null, arguments))
                passed = true;
            trigger(passed);
        }
    };

    var scope = Runner.fnCodeToString(scope);
    var params = Runner.fnArgumentsToString(match);
    var args = Runner.initArguments(params);
    var runnable = scope + code + ';' + args + ';__match__(' + params + ');'

    worker(runnable, latchedVerify);

    return earlyExit;
};

Runner.prototype.verifyNestedRules = function(input) {
    try {
        acorn.parse(input, { ecmaVersion: 6 });
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = Runner;
