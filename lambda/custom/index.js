
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

let audioPlayer;

// Listen for post requests
webhook.listen(3000, function() {
    console.log('Example server listening on port 3000!');
});

webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);

    // Get audioPlayer object with new request
    audioPlayer = app.alexaSkill().audioPlayer();
    app.execute();
});

// =================================================================================
// App Logic: Get name parameter and say hello
// =================================================================================

const handlers = {

    'LAUNCH': function() {
        app.tell('Hello World!');
    },

    'HelpIntent': function() {
        app.tell('HelpIntent');
    },

    'Unhandled': function() {
      app.tell("I'm sorry. I didn't quite grasp what you just said.");
    },

    'PlayAudio': function(topic, tag, date, author, sort, teller) {

      let title = 'Card Title';
      let content = 'Card Content';
      let imageUrl = 'https://s3.amazonaws.com/jovocards/SampleImageCardSmall.png';

      app.followUpState('AUDIOPLAYER');

      // Start playing a file from the beginning
      audioPlayer.play("https://s3.amazonaws.com/storyberries/Rosco-The-Rascal-%E2%80%93-December-Magic.mp3", "Rosco-The-Rascal", "REPLACE_ALL").showImageCard(title, content, imageUrl).tell('Play Audio');

    },

    'AUDIOPLAYER': {
        'AudioPlayer.PlaybackStarted': function() {
            console.log('AudioPlayer.PlaybackStarted');

            app.endSession();
        },

        'AudioPlayer.PlaybackNearlyFinished': function() {
            console.log('AudioPlayer.PlaybackNearlyFinished');

            // Do something

            app.endSession();
        },

        'AudioPlayer.PlaybackFinished': function() {
            console.log('AudioPlayer.PlaybackFinished');

            // Do something

            app.endSession();
        },

        'AudioPlayer.PlaybackStopped': function() {
            console.log('AudioPlayer.PlaybackStopped');

            // Do something

            app.endSession();
        },

    },
};
