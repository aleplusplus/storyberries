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

// API Wordpress

const WPAPI = require( 'wpapi' );
const wp = new WPAPI({ endpoint: 'http://src.wordpress-develop.dev/wp-json' });

// AWS SDK

var AWS = require('aws-sdk');

var polly = new AWS.Polly();

// =================================================================================
// App Logic
// =================================================================================

const handlers = {

    'LAUNCH': function() {
        app.tell('Hello World!');
    },

    'StoriesSearchIntent': function() {
        app.tell('Hello World!');
    },

    'HelpIntent': function() {
        // app.tell('Help!');
        // Promises
        // wp.posts().perPage(1).then(function( data ) {
        //     // do something with the returned posts
        // }).catch(function( err ) {
        //     // handle error
        // });

        /* Synthesizes plain text or SSML into a file of human-like speech. */

       const params = {
        LexiconNames: [
           "example"
        ],
        OutputFormat: "mp3",
        SampleRate: "8000",
        Text: "All Gaul is divided into three parts",
        TextType: "text",
        VoiceId: "Joanna"
       };
       polly.synthesizeSpeech(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         /*
         data = {
          AudioStream: <Binary String>,
          ContentType: "audio/mpeg",
          RequestCharacters: 37
         }
         */
         app.tell('Help!');
       });
    },
};
