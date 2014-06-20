# OMG.js: Object-Relation Mapping for HTML5 Local Storage

## Use
### Create Collection
```javascript
omg.create('People');
```

### Create Collection with seed data
```javascript
omg.create('People', [{id: 5, name: 'Link'}, {id: 6, name: 'Zelda'}]);
```

### Delete Collection 
```javascript
omg.delete('People');
```

### Add new object (or array of objects) to Collection
```javascript
omg.add('People', {id: 5, name: 'Navi'});
```

### Get item from storage by ID
```javascript
omg.getOne('People', 1);
```

### Get property on specific object
```javascript
omg.getOne('People', 5).name;
```

## To Do Soon
- Generate unique ID
- Update single property in object
- set prop on specific object
- Set event handeler on localstorage

## To Do later
- Rename collections
- Extend omg.on to trigger callbacks
- Pollyfil for local storage on legacy browsers 