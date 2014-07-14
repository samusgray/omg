# omg.js: An object oriented interface, ORM, and caching layer for HTML5 Local Storage

Local storage is dope, but current browser implementations only provide a UI blocking, string based interface for key-value pairs. 

omg.js is an object oriented, CRUD interface for HTML5 Local Storage. It enables asynchronous read and writes with a built in caching layer for less code and better performing frontend applications.

## Use

### Create Collections

#### Create an empty collection
```javascript
omg.create('People');
```

#### Create a collection with seed data by passing an object.
```javascript
omg.create('People', {name: 'Zelda'});
```
#### or pass an array of objects.
```javascript
omg.create('People', [{name: 'Link'}, {name: 'Ganon'}]);
```

### Add Objects

#### Add singe object (or array of objects) to collection
```javascript
omg.add('People', {name: 'Navi'});
```

### Read / Get Objects

#### Get an entire collection as an array of objects
```javascript
omg.get('People');
```

#### Get a single object from a collection (by ID)
```javascript
omg.getOne('People', '_xrtfghn09');
```

#### Get an array of objects by property
```javascript
omg.getBy('People', 'name', 'Link');
```

#### Get any property from an object
```javascript
omg.getOne('People', '_xrtfghn09').name;
```

### Delete objects

#### Delete any collection
```javascript
omg.delete('People');
```

#### Delete a single object from collection by ID
```javascript
omg.deleteOne('People', '_xrtfghn09');
```
_omg automatically generates a unique ID for every object added to storage._

### Update / Save

#### Update single object in collection
```javascript
var person = omg.getBy('People', 'name', 'Ganon');
person.name = 'Ganondorf';
omg.save('People', person);
```

### Callbacks

#### Run callback functions when specific omg function is called
```javascript
omg.on('create', function() {
	console.log('Something was created!');
};
```

## To Do Soon
- Write docs for caching objects
- Rename caching functions to match other CRUD functions
- only get/set on window load/unload or during user silence

#### Set up relationship
```javascript
omg.link('People', 'Weapons');
```
#### Get Weapons of People _ax4e390x
```javascript
omg.get('People', '_ax4e390x', 'Weapons');
```

#### Limit return to 2
```javascript
omg.get('People', 'Weapons').limit(1);
```

#### Last / First Weapon
```javascript
omg.get('People', '_ax4e390x', 'Weapons').first();
omg.get('People', '_ax4e390x', 'Weapons').last();
```

## To Do later
- Rename collections
```javascript
omg.update('People', 'Characters');
```

- Make delete / update functions more efficient (Calling setItem() with a named key that already exists will silently overwrite the previous value.)
