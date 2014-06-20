//     OMG.js 0.5.0
//     (c) 2014 Aaron Gray
//     OMG may be freely distributed under the MIT license.

(function(ns){
'use strict';
    // -- Complete:
    // Create Collection: 
    //   omg.create('People');
    // Create Collection with seed data: 
    //   omg.create('People', [{id: 5, name: 'Link'}, {id: 6, name: 'Zelda'}]);
    // Delete Collection: 
    //   omg.delete('People');
    // Add new object (or array of objects) to Collection: 
    //   omg.add('People', {id: 5, name: 'Navi'});
    // Get item from storage by ID: 
    //   omg.getOne('People', 1)
    // Get prop on specific object: 
    //   omg.getOne('People', 5).name => 'Aaron'
    //
    // -- To Do Now:
    // Generate unique ID
    // Update single property in object
    // set prop on specific object
    // Set event handeler on localstorage
    // 
    // -- To Do later:
    // Rename collection
    // Extend omg.on to trigger callbacks
    // Pollyfil for local storage on legacy browsers 

    // Test for local storage support.
    var storageSupport = function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    };

    if (!storageSupport()) {
        console.log('Local storage is not supported! Pollyfil coming soon!');
        return false;
    }

    //handler cache
    var handlers = {};
    
    var defaultProperties = {
        id: 1,
        ts: Date.now()
    };

    function executeHandlers(eventName){
        //get all handlers with the selected name
        var handler = handlers[eventName] || [],
            len = handler.length,
            i;
        //execute each
        for(i = 0; i< len; i++){
            handler[i].apply(this,[]);
        }
    }

    ns.has = function(collection){
        var collectionString = localStorage.getItem(collection);
        if (collectionString) {
            return true;
        } else {
            return false;
        }
    };

    var _omgError = function(type, context) {
        switch (type) {
          case '100':
            console.log('ORM Error 100: ', context, ' This collection does not exsist. Check your spelling or use omg.create() to make a new collection.');
            break;
          case '200':
            console.log('ORM Error 200: ', context, ' This collection already exsists.');
            break;
          case '200':
            console.log('ORM Error 200: ', context, ' This collection already exsists.');
            break;
          default:
            console.log('OH NO YOU BROKE EVERYTHING');
            break;
        }
    };

    //our on function which collects handlers
    ns.on = function(eventName,handler){
        //if no handler collection exists, create one
        if(!handlers[eventName]){
            handlers[eventName] = [];
        }
        handlers[eventName].push(handler);
    };

    ns.get = function(collection){
        if (ns.has(collection)) {
            var collectionString = localStorage.getItem(collection);
            return JSON.parse(collectionString);
        } else {
            _omgError('100', 'get()');
            return false;
        }
    };

    ns.getOne = function(collection, objectID){
        if (ns.has(collection)) {
            var objects = ns.get(collection),
                lookup = {};
            
            for (var i = 0, len = objects.length; i < len; i++) {
                lookup[objects[i].id] = objects[i];
            }
            return lookup[objectID];
        } else {
            _omgError('100', 'getOne()');
        }
    };

    ns.create = function(collection, objectData){
        if (!ns.has(collection)) {
            if (objectData) {
                localStorage.setItem(collection, JSON.stringify(objectData));
            } else {
                localStorage.setItem(collection, '[]');
            }
        } else {
            _omgError('200', 'create()');
        }
    };

    ns.add = function(collection, objectData){
        if (ns.has(collection)) {
            var collectionString = localStorage.getItem(collection);
            // Translate string into object
            var collectionObject = JSON.parse(collectionString);
            // If this is an array of objects
            if (Array.isArray(objectData)){
                // Add each object to the object collection as its own object.
                objectData.forEach(function(object) {
                    collectionObject.push(object);
                });
                // Translate object to string and save in local storage.
                localStorage.setItem(collection, JSON.stringify(collectionObject));
                return objectData;
            }
            // If this is a single object
            if ((typeof objectData == "object") && (objectData !== null) && (!Array.isArray(objectData))) {
                // Add it to the collection object.
                collectionObject.push(objectData);
                // and save to local storage.
                localStorage.setItem(collection, JSON.stringify(collectionObject));
                return objectData;
            }
        } else {
            _omgError('100', 'add()');
        }
    };

    ns.delete = function(collection){
        if (ns.has(collection)) {
            localStorage.removeItem(collection);
        } else {
            _omgError('100', 'delete()');
        }
    };

}(this.omg = this.omg || {}));