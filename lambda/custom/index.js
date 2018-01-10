
// =================================================================================
// App Configuration: Create Webhook + Enable Logging
// =================================================================================

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;

const myIntentMap = {
    'AMAZON.HelpIntent' : 'HelpIntent'
};


// Enable Logging for Quick Testing
app.setConfig({
    requestLogging: true,
    responseLogging: true,
    intentMap: myIntentMap
});

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Example server listening on port 3000!');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});

// =================================================================================
// App Logic: Get name parameter and say hello
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
