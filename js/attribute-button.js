// Prototype Attribute Button
function AttrButton(attribute, gender){

   // Add object properties like this
   this.attribute = attribute;
   //this.gender = gender;
}

// Add methods like this.  All objects of this type will be able to invoke this
Person.prototype.speak = function(){
    alert("Howdy, my name is" + this.name);
};

// Instantiate new objects with 'new'
var person = new Person("Bob", "M");

// Invoke methods like this
person.speak(); // alerts "Howdy, my name is Bob"