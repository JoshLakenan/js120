/**
 * Create an OOP skeletal design based on these requirements. You can use any object creation pattern. 
 * Think carefully about the relationships being created between the types and try to aim for the 
 * least amount of repetition possible. There are several correct answers.

We have a role-playing game that features several enemies that are  mythical creatures or some other type:

- We have Horse that can gallop.
    - A Pegasus is a type of Horse that can gallop and fly.
    - A Unicorn is a type of Horse that can gallop, and pierce.
        - Unicorns are known to be very rare. We should have a 
        method defined somewhere in our code that lets us know 
        how many unicorns have ever been created.

- We have Human that can speak.
    - A Thief is a type of Human that can steal.
    - A Pirate is a type of Thief that can steal and sail.
- A Wizard is a type of Human that can cast spells.

- A Centaur is a creature that has a torso of a man, and the legs of a horse. 
They can speak and gallop. They also have the ability to slash with their swords.
 * 
 * 
 */
class Entity {
  constructor(name, description, legs) {
    this.name = name;
    this.description = description;
    this.legs = legs;

  }
  logLegs() {
    console.log(`${this.name} has ${this.legs} legs. Impressive.`);
  }
}

class Horse extends Entity {
  constructor(name, description) {
    super(name, description, 4);
  }
  gallup() {
    console.log(`This ${this.description} ${this.constructor.name} named ${this.name} is galluping!`);
  }
}
class Pegasus extends Horse {
  constructor(name, description, flightSpeed)  {
    super(name, description);
    this.flightSpeed = flightSpeed;
  }
  fly() {
    console.log(`This ${this.constructor.name} is flying ${this.flightSpeed}!`);
  }
}
class Unicorn extends Horse {
  constructor(name, description, hornLength) {
    super(name, description);
    this.hornLength = hornLength;
    Unicorn.unicornTracker.push(this);
  }
  static unicornTracker = [];
  static howManyUnicorns() {
    console.log(`Belive it or not, there are only ${this.unicornTracker.length} in the world, and their names are : \n`);
    this.unicornTracker.forEach(unicorn => console.log(unicorn.name));
  }
  pierce() {
    console.log(`This ${this.description} ${this.constructor.name} peirces with it's ${this.hornLength} long horn. Watch out.`);
  }
}

class Human extends Entity {
  constructor(name, description) {
    super(name, description, 2);
  }
  speak() {
    let superName = Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name;
    console.log(`Hey there my name is ${this.name}, \n...but you can call me Mr. ${this.constructor.name} the ${superName}.\n Some people say that I'm ${this.description}.`);
  }
}
class Theif extends Human {
  constructor(name, description, sneakiness) {
    super(name, description);
    this.sneakiness = sneakiness;
  }
  steal() {
    console.log(`Oop got your nose! I'm a ${this.sneakiness} sneaky theif.`);
  }
}
class Pirate extends Theif {
  constructor(name, description, sneakiness) {
    super(name, description, sneakiness);
  }
  sail() {
    console.log(`Here I go sailing! On my ${this.legs} sea legs!`);
  }
}
class Wizard extends Human {
  constructor(name, description, spell) {
    super(name, description);
    this.spell = spell;
  }
  castSpell() {
    console.log(`abra kedabra, alaka- ${this.spell}!!!`);
  }
}

class Centaur extends Entity {
  constructor(name, description, swordSize) {
    super(name, description, 4);
    this.swordSize = swordSize;
  }
  slash() {
    console.log(`The ${this.constructor.name} named ${this.name} swings his ${this.swordSize} sword right at you!`);
  }
}

let humanHorseHybridMethods = {
  speak : Human.prototype.speak,
  gallup : Horse.prototype.gallup
}
Object.assign(Centaur.prototype, humanHorseHybridMethods);

let EeekOOEntity = new Entity('EeekOO','shadowy', 1000);

let daleHorse = new Horse('dale', 'brown');
let jimmyUnicorn = new Unicorn('Jimmy', 'massive', '3 foot');
let favioUnicorn = new Unicorn('Favio', 'rainbow', '2 foot');
let clarenceUnicorn = new Unicorn('Clarance', 'jealous', '2.5 foot');
let peggy = new Pegasus('Peggy', 'lil', 'Super very quite fast');

let timHuman = new Human("Tim", 'nondescript');
let tomTheif = new Theif('Tom', 'stinky', 'surprisingly');
let janicePirate = new Pirate('Janice', 'beautiful', 'not very');
let earlWizard = new Wizard('Earl', 'jaundiced', 'Upside down polar bear lightning');

let jakeCentaur = new Centaur('Jake', 'tall for my age', 'average sized');

/******** Uncomment chunks below to test the each class instance's functionality ********/

//Centaur
jakeCentaur.slash();
jakeCentaur.logLegs();
jakeCentaur.gallup();
jakeCentaur.speak();

// //Horse
// daleHorse.gallup();
// daleHorse.logLegs();

// //Unicorn
// favioUnicorn.gallup();
// favioUnicorn.pierce();
// favioUnicorn.logLegs();
// Unicorn.howManyUnicorns();

// //Pegasus
// peggy.gallup();
// peggy.fly();
// peggy.logLegs();



// Human
// timHuman.speak();
// timHuman.logLegs();

// //thief
// tomTheif.speak();
// tomTheif.steal();
// tomTheif.logLegs();

// //pirate
// janicePirate.speak();
// janicePirate.steal();
// janicePirate.sail();
// janicePirate.logLegs();

