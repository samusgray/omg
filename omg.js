//     OMG.js 0.5.7
//     (c) 2014 Aaron Gray
//     OMG.js may be freely distributed under the MIT license.

(function(ns){
    // Boolean to test for local storage support.
    var _storageSupport = function() {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    };

    // Handler cache
    var handlers = {};

    var _executeHandlers = function(eventName){
        //get all handlers with the selected name
        var handler = handlers[eventName] || [],
            len = handler.length,
            i;
        //execute each
        for(i = 0; i< len; i++){
            handler[i].apply(this,[]);
        }
    }

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

    // Register callback functions for omg events.
    ns.on = function(eventName, handler){
        // If no handler collection exists, create one!
        if(!handlers[eventName]){
            handlers[eventName] = [];
        }
        handlers[eventName].push(handler);
    };

    // Generate a unique ID for new objects.
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
    // TODO: Remove? Return parsed collection to avoid UI blocking.
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
      var collectionString = localStorage.getItem(collection);
        if (collectionString) {
            return JSON.parse(collectionString);
        } else {
            _omgError('100', 'get()');
            return false;
        }
        _executeHandlers('get');
    };


    // Returns a array of objects based on property.
    ns.getBy = function(collection, k, v){
        var objects = ns.get(collection)
            ,lookup = [];
        if (objects) {
            for (var i = 0, len = objects.length; i < len; i++) {
                if (objects[i][k] == v) {
                    lookup.push(objects[i]);
                }
            }
            return lookup;
        } else {
            _omgError('100', 'getOne()');
        }
        _executeHandlers('getBy');
    };

    // Returns a single object based on ID.
    ns.getOne = function(collection, objectID){
      var one = ns.getBy(collection, 'id', objectID);
      return one[0];
      _executeHandlers('getOne');
    };

    // Add object to collection.
    ns.add = function(collection, newData){
        var collectionString = localStorage.getItem(collection)
            ,objects = JSON.parse(collectionString);
          if (objects) {
            // If this is an array of objects...
            if (Array.isArray(newData)){
                // ...add each object to the object collection as its own object.
                for (var i = 0; i < newData.length; i++) {
                    var object = ns.ID(newData[i]);
                    objects.push(object);
                }
            }
            // If this is a single object...
            if ((typeof newData == "object") && (newData !== null) && (!Array.isArray(newData))) {
                var objectData = ns.ID(newData);
                // Add it to the collection object...
                objects.push(objectData);
            }
            // and save to local storage.
            localStorage.setItem(collection, JSON.stringify(objects));
        } else {
            _omgError('100', 'add()');
        }
        _executeHandlers('add');
        return objects;
      };

    // Add object to collection no matter what.
    ns.addForce = function(collection, newData){
        var objects = [];
        // If this is an array of objects
        if (Array.isArray(newData)){
            // Add each object to the object collection as its own object.
            for (var i = 0; i < newData.length; i++) {
                var object = ns.ID(newData[i]);
                objects.push(object);
            }
        }
        // If this is a single object...
        if ((typeof newData == "object") && (newData !== null) && (!Array.isArray(newData))) {
            newData = ns.ID(newData);
            // Add it to the collection object...
            objects.push(newData);
        }
        // and save to local storage.
        localStorage.setItem(collection, JSON.stringify(objects));
        _executeHandlers('add');
        return objects;
    };

    // Creates a new collection if it doesn't already exsist.
    ns.create = function(collection, objectData){
        if (objectData) {
            localStorage.setItem(collection, JSON.stringify(objectData));
        } else {
            localStorage.setItem(collection, '[]');
        }
        _executeHandlers('create');
    };

    // Remove a collection from storage.
    ns.delete = function(collection){
        localStorage.removeItem(collection);
        _executeHandlers('delete');
    };

    // Remove an object from collection.
    ns.deleteOne = function(collection, objectID, callback){
        var objects = ns.get(collection);
        if (objects) {
            for (var i = objects.length - 1; i >= 0; i--) {
                if (objects[i].id == objectID) {
                    objects.splice(i, 1);
                }
            };
            var newCollection = ns.addForce(collection, objects);

            if (callback) {
                callback(newCollection);
            }
        } else {
            _omgError('100', 'delete()');
        }
        _executeHandlers('deleteOne');
    };

    // Save an updated object to collection.
    ns.save = function(collection, object){
        ns.deleteOne(collection, object.id, function(newCollection) {
            ns.add(collection, object);
        });
        _executeHandlers('save');
    };

    // Incomplete: Assign new relationship.
    ns.link = function(collection, hasCollection) {
        var collectionData = ns.get(collection);

        for (var i = collectionData.length - 1; i >= 0; i--) {
            collectionData[i][hasCollection] = [];
        };

        ns.delete(collection);
        ns.create(collection, collectionData);

        _executeHandlers('link');
    };

    // Delete everything.
    ns.flush = function(){
        localStorage.clear();
        _executeHandlers('flush');
    };

    omg.cache = {

    };

    ns.fromCache = function(collection, attr, value) {
        var cache = ns.cache[collection];
        for(var i = 0; i < cache.length; i += 1) {
            if(cache[i][attr] === value) {
                return cache[i];
            }
        }
    }

}(this.omg = this.omg || {}));
