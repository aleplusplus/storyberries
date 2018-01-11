"use strict";

module.exports = Object.freeze({
    
    //App-ID. TODO: set to your own Skill App ID from the developer portal.
    //appId : 'amzn1.ask.skill.9d443a73-2646-4a19-968a-28da1d9064ea',

    // when true, the skill logs additional detail, including the full request received from Alexa
    debug : false,

    // when defined, it tries to read / write DynamoDB to save the last time Jingle was played for that user
    // this allows to avoid to repaet the jingle at each invocation 
    jingle : {
        databaseTable : "stories",
        //playOnceEvery : 1 * 60 * 60 * 24 // 24 hours
        playOnceEvery : 1 * 60 * 3 // 3 minutes 
    }

});
