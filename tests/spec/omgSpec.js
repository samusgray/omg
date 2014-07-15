describe("Create, add, get, getBy", function() {

  beforeEach(function() {
  });

  it("Expect People to have objects", function() {
    omg.create('People');
    omg.add('People', {name: 'Link'});
    expect(omg.get('People')[0].name).toBe('Link');
  });

  it("Return value from any key", function() {
    omg.add('People', [{name: 'Zelda'}, {name: 'Navi'}]);
    var matches = omg.getBy('People', 'name', 'Link');
    expect(matches[0].name).toBe('Link');
  });
});

describe("omg.getOne", function() {
  it("Should return an object based on ID", function() {
    omg.create('People', [
      {name: 'Majora'}, 
      {name: 'Epona', id: '123'}
    ]);
    var one = omg.getOne('People', '123');
    expect(one.name).toBe('Epona');
  });
});

describe("omg.getBy", function() {
  it("Should return an array of objects based on any key.", function() {
    omg.create('People',[
      {name: 'Link', weapon: 'Master Sword'},
      {name: 'Navi', weapon: 'none'},
      {name: 'Sheik', weapon: 'Needles'},
      {name: 'Epona', weapon: 'none'}
    ]);
    var noWeapons = omg.getBy('People', 'weapon', 'none');
    expect(noWeapons.length).toBe(2);
  });
});

describe("omg.on", function(){
    it("Should trigger a callback when set on omg function", function() {
      var catcher;
    omg.on('create', function(){
      catcher = 'Win!';
    });
    omg.create('People');
    expect(catcher).toBe('Win!');
   });
});


describe("Flush", function() {
  it("Should remove all items from local storage", function(){
    omg.create('People');
    omg.add('People', {name: 'Flush Me!'});
    omg.flush();
    var people = omg.get('People');
    expect(people).toBe(false);
  });
});
