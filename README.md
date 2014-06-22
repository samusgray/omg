# omg.js: Object-Relation Mapping for HTML5 Local Storage

Local storage is dope, but everything is stored as strings, so it leaves the object oriented programmer wanting. omg.js reduces lines of code by encoding and decoding objects & arrays as necessary to save and retrieve data from local storage.

## Use
### Create an empty collection
```javascript
omg.create('People');
```

### Create a collection with seed data
```javascript
omg.create('People', {name: 'Zelda'});
```

or

```
omg.create('People', [{name: 'Link'}, {name: 'Ganon'}]);
```

### Delete any collection
```javascript
omg.delete('People');
```

### Delete a single object from collection
```javascript
omg.deleteOne('People', '_xrtfghn09');
```

### Add new object (or array of objects) to collection
```javascript
omg.add('People', {name: 'Navi'});
```

### Get an entire collection as an array of objects
```javascript
omg.get('People');
```

### Get a single object from a collection (by ID)
```javascript
omg.getOne('People', '_xrtfghn09');
```

### Get an array of objects by property
```javascript
omg.getBy('People', 'name', 'Link');
```

### Get any property from an object
```javascript
omg.getOne('People', '_xrtfghn09').name;
```

### Update single object in collection
```javascript
var person = omg.getBy('People', 'name', 'Ganon');
person.name = 'Ganondorf';
omg.save('People', person);
```

## To Do Soon
- Set event handeler on localstorage (trigger for any change, or specific change)
- Map object relationships

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
- Extend omg.on to trigger callbacks