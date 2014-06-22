//     OMG.js 0.5.2
//     (c) 2014 Aaron Gray
//     OMG.js may be freely distributed under the MIT license.

(function(ns){

    // Boolean to test for local storage support.
    var storageSupport = function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    };

    // If local storage is not supported...
    if (!storageSupport()) {
        console.log('Local storage is not supported! Pollyfil coming soon!');
        // Just give up.
        return false;
    }

    // Handler cache
    var handlers = {};

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

    // (incomplete) Register callback functions for omg events.
    ns.on = function(eventName,handler){
        // If no handler collection exists, create one!
        if(!handlers[eventName]){
            handlers[eventName] = [];
        }
        handlers[eventName].push(handler);
    };

    // Common errors.
    var _omgError = function(type, context) {
        switch (type) {
          case '100':
            console.log('omg! Error 100: ', context, ' This collection does not exsist. Check your spelling or use omg.create() to make a new collection.');
            break;
          case '200':
            console.log('omg! Error 200: ', context, ' This collection already exsists.');
            break;
          case '200':
            console.log('omg! Error 200: ', context, ' This collection already exsists.');
            break;
          default:
            console.log('OH NO YOU BROKE EVERYTHING');
            break;
        }
    };

    ns.ID = function(objectData) {
        if (!objectData.id) {
            objectData.id = '_' + Math.random().toString(36).substr(2, 9);
        }
        if (!objectData.ts) {
            objectData.ts = Date.now();
        }
        return objectData;
    };

    // Boolean to check if a collection exsists.
    ns.has = function(collection){
        var collectionString = localStorage.getItem(collection);
        if (collectionString) {
            return true;
        } else {
            return false;
        }
    };    

    // Returns the contents of a collection as an array of objects.
    ns.get = function(collection){
        if (ns.has(collection)) {
            var collectionString = localStorage.getItem(collection);
            return JSON.parse(collectionString);
        } else {
            _omgError('100', 'get()');
            return false;
        }
        executeHandlers('get');
    };

    // Returns a single object based on ID.
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
        executeHandlers('getOne'); 
    };

    // Returns a array of objects based on property.
    ns.getBy = function(collection, k, v){
        if (ns.has(collection)) {
            var objects = ns.get(collection),
                lookup = [];
            for (var i = 0, len = objects.length; i < len; i++) {
                if (objects[i][k] == v) {
                    lookup.push(objects[i]);
                }
            }
            return lookup;
        } else {
            _omgError('100', 'getOne()');
        }
        executeHandlers('getBy');
    };    

    // Add object to collection.
    ns.add = function(collection, objectData){
        if (ns.has(collection)) {
            var collectionString = localStorage.getItem(collection);
            // Translate string into object
            var collectionObject = JSON.parse(collectionString);
            // If this is an array of objects
            if (Array.isArray(objectData)){
                // Add each object to the object collection as its own object.
                objectData.forEach(function(object) {
                    object = ns.ID(object);
                    collectionObject.push(object);
                });
            }
            // If this is a single object...
            if ((typeof objectData == "object") && (objectData !== null) && (!Array.isArray(objectData))) {
                objectData = ns.ID(objectData);
                // Add it to the collection object...
                collectionObject.push(objectData);
            }
            // and save to local storage.
            localStorage.setItem(collection, JSON.stringify(collectionObject));
        } else {
            _omgError('100', 'add()');
        }
        executeHandlers('add');
    };

    // Creates a new collection if it doesn't already exsist.
    ns.create = function(collection, objectData){
        if (!ns.has(collection)) {
            if (objectData) {
                localStorage.setItem(collection, '[]');
                ns.add(collection, objectData);
            } else {
                localStorage.setItem(collection, '[]');
            }
        } else {
            _omgError('200', 'create()');
        }
        executeHandlers('create');
    };

    // Remove a collection from storage.
    ns.delete = function(collection){
        if (ns.has(collection)) {
            localStorage.removeItem(collection);
        } else {
            _omgError('100', 'delete()');
        }
        executeHandlers('delete');
    };

    // Remove an object from collection.
    ns.deleteOne = function(collection, objectID, callback){
        if (ns.has(collection)) {
            var collectionData = ns.get(collection);
            
            for (var i = collectionData.length - 1; i >= 0; i--) {
                if (collectionData[i].id == objectID) {
                    collectionData.splice(i, 1);
                }
            };
            ns.delete(collection);
            var newCollection = ns.create(collection, collectionData);
            if (callback) {
                callback(newCollection);
            }
        } else {
            _omgError('100', 'delete()');
        }
        executeHandlers('deleteOne');
    };

    // Save an updated object to collection.
    ns.save = function(collection, object){
        ns.deleteOne(collection, object.id, function(newCollection) {
            ns.add(collection, object);
        });
        executeHandlers('save');
    };

    // Incomplete: Assign new relationship.
    ns.link = function(collection, hasCollection) {
        var collectionData = ns.get(collection);
        
        for (var i = collectionData.length - 1; i >= 0; i--) {
            collectionData[i][hasCollection] = [];
        };
        
        ns.delete(collection);
        ns.create(collection, collectionData);
        
        executeHandlers('link');
    };

    // Delete everything.
    ns.flush = function(){
        localStorage.clear()
    };

}(this.omg = this.omg || {}));