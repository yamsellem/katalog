
require('!style!css!sass!./assets/styles.scss');

var _ = require('lodash');

var Editor = require('./editor'),
    tabs = require('./tabs'),
    Challenges = require('./challenges');

var js = new Editor('javascript', 'js');
var html = new Editor('html', 'html');

tabs(document.querySelector('.left > ul'), function(i) {
    i === 1 ? js.focus() : html.focus();
});

var challenge = Challenges.first();
document.querySelector('#notice').innerHTML = '<h1>' + challenge.title + '</h1><p>' + challenge.goal + '</p>';

var iframe = document.getElementsByTagName('iframe')[0].contentWindow.document;
var render = function() {
    try {
        iframe.open();
        iframe.write('<html>');
        iframe.write('<head><style type="text/css">html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}</style></head>');
        iframe.write('</body>' + html.get() + '</body>');
        iframe.write('<script>' + challenge.wrap(js.get()) + '</script>');
        iframe.write('</html>');
        iframe.end();
    } catch(e) {}
}

var refresh = _.debounce(function() {
    var code = js.get();
    if (challenge.validate(code))
        render();

    var classes = document.querySelector('.left i').classList;
    classes.toggle('solved', false);

    challenge.verify(code, function(score) {
        var perfect = true;
        Object.keys(score).forEach(function(key) {
            perfect = perfect && score[key];
        });
        classes.toggle('solved', perfect);
        console.log(score, perfect);
    });
}, 450);

html.on('change', refresh);
js.on('change', refresh);
