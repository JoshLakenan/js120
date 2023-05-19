class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class WheeledVehicle extends Vehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.tirePressure = tirePressure;
  }
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    super([20,20], 80, 8.0);
  }
}

class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

const WheelMethods = {
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  },

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}