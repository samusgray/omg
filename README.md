# omg.js: Object-Relation Mapping for HTML5 Local Storage

Local storage is dope, but everything is stored as strings, so it leaves the object oriented programmer wanting. omg.js reduces lines of code by encoding and decoding objects & arrays as necessary to save and retrieve data from local storage.

## Use
### Create Collection
```javascript
omg.create('People');
```

### Create Collection with seed data
```javascript
omg.create('People', {id: 6, name: 'Zelda'});
```

or

```
omg.create('People', [{id: 7, name: 'Link'}, {id: 8, name: 'Ganondorf'}]);
```

### Delete Collection
```javascript
omg.delete('People');
```

### Add new object (or array of objects) to Collection
```javascript
omg.add('People', {id: 5, name: 'Navi'});
```

### Get an entire collection as an array of objects.
```javascript
omg.get('People');
```

### Get a single object from a collection (by ID);
```javascript
omg.getOne('People', 1);
```

### Get any property from an object.
```javascript
omg.getOne('People', 5).name;
```

## To Do Soon
- Generate unique ID for every object added to a collection.
- Function to update single property in object
```javascript
var midna = omg.set('People', 3).name = "Midna"; midna.save;
```
- Set event handeler on localstorage (trigger for any change, or specific change)
- Map object relationships

#### Set up relationship
```javascript
omg('People').have('Friends');
```
#### Get Friends of People 1
```javascript
omg.get('Friends').of('People', 1);
```

#### Limit return to 2
```javascript
omg.get('Friends').of('People', 1).limit(1);
```

#### Last / First friend
```javascript
omg.get('Friends').of('People', 1).first();
omg.get('Friends').of('People', 1).last();
```

## To Do later
- Rename collections 
```javascript
omg.update('People', 'Characters');
```
- Extend omg.on to trigger callbacks
- Pollyfil for local storage on legacy browsers 