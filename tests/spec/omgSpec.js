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

describe("Flush", function() {

  it("Should remove all items from local storage", function(){
    omg.create('People');
    omg.add('People', {name: 'Flush Me!'});
    omg.flush();
    var people = omg.get('People');
    expect(people).toBe(false);
  });

});
