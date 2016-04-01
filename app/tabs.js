"use strict";

var tabs = function(selector, fn) {
    var items = selector.querySelectorAll('li');
    var cts = selector.nextElementSibling.querySelectorAll('.content');
    for (var i = 0; i < items.length; i++)
        tab(items, cts, i, fn);
};

var tab = function(items, contents, i, fn) {
    items[i].addEventListener('click', function() {
        for (var j = 0; j < items.length; j++) {
            items[j].classList.remove('active');
            contents[j].classList.remove('active');
        }
        items[i].classList.add('active');
        contents[i].classList.add('active');

        if (fn)
            fn(i);
    });
};

module.exports = tabs;
