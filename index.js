
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./node_modules/botkit/lib/Botkit.js');
var os = require('os');
var _ = require('lodash');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


var helpResources = [
    "This is a great resource for learning node/express: https://nodeschool.io/",
    "https://css-tricks.com/ has great posts on a range of topics.",
    "A directory of APIs to play with can be found at https://www.programmableweb.com/apis/directory",
    "Sass is a CSS precompiler, check it out at http://sass-lang.com/",
    "Check out the best codepens of 2016 at http://codepen.io/2016/popular/pens/",
    "A good article if anyone wants a clear understanding of the 'this' keyword in Javascript: http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/",
    "You can find a flowchart maker at https://www.draw.io/",
    "hey guys, an incredibly comprehensive jQuery cheat sheet: https://oscarotero.com/jquery/",
    "The Ruby on Rails workflow: https://i.stack.imgur.com/0fK8F.png",
    "Here's why I would never, ever disable the authenticity token in a production app: http://stackoverflow.com/questions/5207160/what-is-a-csrf-token-what-is-its-importance-and-how-does-it-work",
    "Maybe you can try some of the problems on http://www.codewars.com/",
    "http://flexboxfroggy.com/ is a fun way to learn flexbox",
    "Awesome guide to get started with redux: http://redux.js.org/",
    "Good Redux examples to get started with: http://redux.js.org/docs/introduction/Examples.html",
    "When you have more time, 30 days of React is a great resource https://www.fullstackreact.com/30-days-of-react/",
    "Check out https://frontendmasters.gitbooks.io/front-end-handbook-2017/"
];


controller.hears(['^hello', '^hi'], 'ambient', function(bot, message) {
    bot.reply(message, "Hey guys, time for the warmup");


});

controller.hears('stupid question', 'ambient', function(bot, message) {
    bot.reply(message, "I thought I was dignifying it with a stupid response");
});

controller.hears(['obvious question', 'might be obvious'], 'ambient', function(bot, message) {
    bot.reply(message, 'Well, it’s harsh to say it’s obvious');
});

controller.hears(['postico', 'finder', 'postico'], 'ambient', function(bot, message) {
    bot.reply(message, 'When a graphical interface is used a bit of me dies');
});

controller.hears(['error', 'mistake'], 'ambient', function(bot, message) {
    var msgArr = ['Errors in red are generally not normal', 'I thought you were trying to make frog noises, I don’t know', 'If you’re going to have bad spelling you should be consistent', 'I don’t make spelling mistakes'];
    var selectedMsg = _.sample(msgArr);
    bot.reply(message, selectedMsg);
});

controller.hears('warmup', 'ambient', function(bot, message) {
    bot.reply(message, 'In my defense guys, I don’t actually read the warmups');
});

controller.hears(['vim', 'command line'], 'ambient', function(bot, message) {
    var msgArr = ['How awesome is vim', 'You can\'t just put anything in there'];
    var selectedMsg = _.sample(msgArr);
    bot.reply(message, selectedMsg);
});

controller.hears('help', 'direct_message,direct_mention,mention', function(bot, message) {
    var selectedMsg = _.sample(helpResources);
    bot.reply(message, selectedMsg);
});

controller.hears(['get out', 'leave'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, "I'm gonna go to the back of the room where I belong");
});

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}

controller.on('tick', function(bot, event) {});
