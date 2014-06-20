# OMG.js: Object-Relation Mapping for HTML5 Local Storage

## Use
### Create Collection: 
```omg.create('People');```

### Create Collection with seed data: 
```omg.create('People', [{id: 5, name: 'Link'}, {id: 6, name: 'Zelda'}]);```

### Delete Collection: 
```omg.delete('People');```

### Add new object (or array of objects) to Collection: 
```omg.add('People', {id: 5, name: 'Navi'});```

### Get item from storage by ID: 
```omg.getOne('People', 1);```

### Get property on specific object: 
```omg.getOne('People', 5).name;```

## To Do Soon:
- Generate unique ID
- Update single property in object
- set prop on specific object
- Set event handeler on localstorage

## To Do later:
- Rename collections
- Extend omg.on to trigger callbacks
- Pollyfil for local storage on legacy browsers 