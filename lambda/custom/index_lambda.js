'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const app = require('jovo-framework').Jovo;

const myIntentMap = {
    'AMAZON.HelpIntent' : 'HelpIntent'
};

app.setIntentMap(myIntentMap);

exports.handler = function(event, context, callback) {
    app.handleRequest(event, callback, handlers);
    app.execute();
};

// =================================================================================
// App Logic
// =================================================================================

const handlers = {

    'LAUNCH': function() {
        app.tell('Hello World!');
    },

    'StoriesSearchIntent': function(topic, tag, date, author, sort) {
        app.followUpState('StoriesSearchFollowup').tell("StoriesSearchIntent");
    },

    'StoriesSearchFollowup': {

      'StoriesSearchNextIntent': function() {
        app.followUpState('StoriesSearchFollowup').tell("StoriesSearchNextIntent");
      },

      'StoriesSearchPreviousIntent': function() {
        app.followUpState('StoriesSearchFollowup').tell("StoriesSearchPreviousIntent");
      },

      'StoriesSearchRepeatIntent': function() {
        app.followUpState('StoriesSearchFollowup').tell("StoriesSearchRepeatIntent");
      }

    }

    'HelpIntent': function() {
        app.tell('HelpIntent');
    },

    'Unhandled': function() {
      app.tell("I'm sorry. I didn't quite grasp what you just said.");
    }
};
